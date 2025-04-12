import joblib
import pandas as pd
import shap
import numpy as np
import json
import sys
import os
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Script directory: {script_dir}", file=sys.stderr)

# Load trained models and data with absolute paths
model_path = os.path.join(script_dir, "ensemble_model.pkl")
scaler_path = os.path.join(script_dir, "scaler.pkl")
label_encoders_path = os.path.join(script_dir, "label_encoders.pkl")
dataset_path = os.path.join(script_dir, "Flight_landing_data.csv")

print(f"Model path: {model_path}", file=sys.stderr)
print(f"Scaler path: {scaler_path}", file=sys.stderr)
print(f"Label encoders path: {label_encoders_path}", file=sys.stderr)
print(f"Dataset path: {dataset_path}", file=sys.stderr)

# Check if files exist
for path in [model_path, scaler_path, label_encoders_path, dataset_path]:
    if not os.path.exists(path):
        print(f"Error: File does not exist: {path}", file=sys.stderr)
    else:
        print(f"File exists: {path}", file=sys.stderr)

try:
    print("Loading model...", file=sys.stderr)
    model = joblib.load(model_path)
    print("Model loaded successfully", file=sys.stderr)
    
    print("Loading scaler...", file=sys.stderr)
    scaler = joblib.load(scaler_path)
    print("Scaler loaded successfully", file=sys.stderr)
    
    print("Loading label encoders...", file=sys.stderr)
    label_encoders = joblib.load(label_encoders_path)
    print("Label encoders loaded successfully", file=sys.stderr)
    
    print("Loading dataset...", file=sys.stderr)
    dataset = pd.read_csv(dataset_path)
    print("Dataset loaded successfully", file=sys.stderr)
except Exception as e:
    print(f"Error loading models or dataset: {str(e)}", file=sys.stderr)
    sys.exit(1)

feature_names = [
    "Altitude_AGL_ft", "Vertical_Speed_fpm", "Touchdown_Velocity_fps", "G_Force", 
    "Wind_Speed_kts", "Crosswind_Component_kts", "Visibility_miles", "Runway_Condition",
    "Throttle_Input", "Brake_Force_pct", "Flaps_Position_deg", "Rudder_Deflection_deg",
    "Aileron_Deflection_deg", "Landing_Gear_Force_N", "Spoiler_Deployment_pct", "Reverse_Thrust_pct"
]

explainer = shap.TreeExplainer(model.named_estimators_['et'])

def get_flight_data(flight_id):
    flight_row = dataset[dataset['Flight_ID'] == flight_id]
    if flight_row.empty:
        return None
    
    flight_data = flight_row.iloc[0].to_dict()
    return {
        "Flight_ID": flight_data["Flight_ID"],
        "Altitude_AGL_ft": float(flight_data["Altitude_AGL_ft"]),
        "Vertical_Speed_fpm": float(flight_data["Vertical_Speed_fpm"]),
        "Touchdown_Velocity_fps": float(flight_data["Touchdown_Velocity_fps"]),
        "G_Force": float(flight_data["G_Force"]),
        "Wind_Speed_kts": float(flight_data["Wind_Speed_kts"]),
        "Crosswind_Component_kts": float(flight_data["Crosswind_Component_kts"]),
        "Visibility_miles": float(flight_data["Visibility_miles"]),
        "Runway_Condition": flight_data["Runway_Condition"],
        "Throttle_Input": float(flight_data["Throttle_Input"]),
        "Brake_Force_pct": float(flight_data["Brake_Force_pct"]),
        "Flaps_Position_deg": float(flight_data["Flaps_Position_deg"]),
        "Rudder_Deflection_deg": float(flight_data["Rudder_Deflection_deg"]),
        "Aileron_Deflection_deg": float(flight_data["Aileron_Deflection_deg"]),
        "Landing_Gear_Force_N": float(flight_data["Landing_Gear_Force_N"]),
        "Spoiler_Deployment_pct": float(flight_data["Spoiler_Deployment_pct"]),
        "Reverse_Thrust_pct": float(flight_data["Reverse_Thrust_pct"])
    }

def predict_landing(data):
    try:
        input_data = pd.DataFrame([[
            float(data["Altitude_AGL_ft"]), float(data["Vertical_Speed_fpm"]),
            float(data["Touchdown_Velocity_fps"]), float(data["G_Force"]),
            float(data["Wind_Speed_kts"]), float(data["Crosswind_Component_kts"]),
            float(data["Visibility_miles"]), data["Runway_Condition"],
            float(data["Throttle_Input"]), float(data["Brake_Force_pct"]),
            float(data["Flaps_Position_deg"]), float(data["Rudder_Deflection_deg"]),
            float(data["Aileron_Deflection_deg"]), float(data["Landing_Gear_Force_N"]),
            float(data["Spoiler_Deployment_pct"]), float(data["Reverse_Thrust_pct"])
        ]], columns=feature_names)

        for col in ["Runway_Condition"]:
            le = label_encoders[col]
            if data["Runway_Condition"] not in le.classes_:
                raise ValueError(f"Invalid Runway_Condition value: {data['Runway_Condition']}")
            input_data[col] = le.transform([input_data[col].iloc[0]])[0]

        input_scaled = scaler.transform(input_data)
        prediction = model.predict(input_scaled)[0]
        prob = model.predict_proba(input_scaled)[0]
        risk = "Hard Landing" if prediction == 1 else "Soft Landing"
        prob_hard = prob[1]

        shap_values_raw = explainer.shap_values(input_scaled)
        if isinstance(shap_values_raw, list):
            shap_values = shap_values_raw[1]
        else:
            shap_values = shap_values_raw[0] if len(shap_values_raw.shape) == 2 else shap_values_raw[0, :, 1]
        
        shap_contributions = dict(zip(feature_names, shap_values))
        shap_sum = sum(abs(v) for v in shap_contributions.values())
        if shap_sum > 0:
            shap_contributions = {k: v / shap_sum for k, v in shap_contributions.items()}

        if prediction == 0:
            return {
                "prediction": risk,
                "probability": f"{prob_hard:.2%}",
                "shap_contributions": {k: float(v) for k, v in shap_contributions.items()},
                "message": "No significant changes needed."
            }
        else:
            corrective_measures = generate_corrective_measures(shap_contributions)
            return {
                "prediction": risk,
                "probability": f"{prob_hard:.2%}",
                "shap_contributions": {k: float(v) for k, v in shap_contributions.items()},
                "corrective_measures": corrective_measures
            }
    except Exception as e:
        raise ValueError(f"Prediction error: {str(e)}")

def generate_corrective_measures(shap_contributions):
    measures = []
    threshold = 0.05
    
    if shap_contributions["Vertical_Speed_fpm"] > threshold:
        measures.append(f"Reduce vertical speed by 100-200 ft/min (current: {shap_contributions['Vertical_Speed_fpm']:.3f} SHAP).")
    if shap_contributions["Touchdown_Velocity_fps"] > threshold:
        measures.append(f"Decrease touchdown velocity by 5-10 fps (current: {shap_contributions['Touchdown_Velocity_fps']:.3f} SHAP).")
    if shap_contributions["G_Force"] > threshold:
        measures.append(f"Reduce G-force to below 1.5 (current: {shap_contributions['G_Force']:.3f} SHAP).")
    if shap_contributions["Landing_Gear_Force_N"] > threshold:
        measures.append(f"Reduce landing gear force by 200-500 N (current: {shap_contributions['Landing_Gear_Force_N']:.3f} SHAP).")
    if shap_contributions["Flaps_Position_deg"] < -threshold:
        measures.append(f"Increase flaps angle by 5-10 degrees (current: {shap_contributions['Flaps_Position_deg']:.3f} SHAP).")
    if shap_contributions["Brake_Force_pct"] > threshold:
        measures.append(f"Reduce brake force by 10-20% (current: {shap_contributions['Brake_Force_pct']:.3f} SHAP).")
    
    return measures if measures else ["No significant adjustments identified."]

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python predictor.py <function> <data>", file=sys.stderr)
        sys.exit(1)
    
    function_name = sys.argv[1]
    data = sys.argv[2]
    
    try:
        if function_name == "get_flight_data":
            result = get_flight_data(data)
        elif function_name == "predict_landing":
            result = predict_landing(json.loads(data))
        else:
            print(f"Unknown function: {function_name}", file=sys.stderr)
            sys.exit(1)
        
        # Only output the JSON result to stdout
        print(json.dumps(result))
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1) 