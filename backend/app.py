from flask import Flask, jsonify, request, session
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
import pandas as pd
import random
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from jwt.exceptions import DecodeError
import os
from dotenv import load_dotenv



load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
db = SQLAlchemy(app)
CORS(app)
app.config['CORS_HEADERS'] = 'application/json'
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

threshold_values = {
    'Diabetes': {'sugars': 10, 'carbohydrate': 935},
    'Hypertension': {'sodium': 1500, 'potassium': 4000},
    'High Cholesterol': {'cholesterol': 300, 'saturated_fat': 20},
    'Osteoporosis': {'calcium': 1000, 'vitamin_d': 800},
    'Iron Deficiency Anemia': {'iron': 18, 'folate': 400},
    'Obesity': {'calories': 2000, 'total_fat': 70},
    'Heart Disease': {'total_carbohydrates': 300, 'fiber': 25},
    'Kidney Disease': {'phosphorous': 800, 'protein': 50},
    'Acid Reflux': {'caffeine': 100, 'fatty_acids_total_trans': 2}
    # Add more threshold values as needed
}

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100))
    age = db.Column(db.Integer)
    diagnosed_conditions = db.Column(db.ARRAY(db.String(100)))
    # Add more fields as needed

    def __repr__(self):
        return f'<UserProfile {self.user_id}>'

class GroceryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.String(50))
    user_id = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<GroceryItem {self.user_id}>'

# Endpoint to add a grocery item
@app.route('/grocery/add', methods=['POST'])
def add_grocery_item():
    data = request.json
    new_item = GroceryItem(name=data['name'], quantity=data['quantity'], user_id=data['user_id'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Grocery item added successfully'}), 201

@app.route('/grocery/<item_id>', methods=['DELETE'])
def delete_grocery_item(item_id):
    try:
        item = GroceryItem.query.get(item_id)
        if item:
            db.session.delete(item)
            db.session.commit()
            return jsonify({'message': 'Grocery item deleted successfully'}), 200
        else:
            return jsonify({'message': 'Grocery item not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error deleting grocery item', 'error': str(e)}), 500


# Endpoint to get all grocery items for a user
@app.route('/grocery/<user_id>', methods=['GET'])
def get_grocery_items(user_id):
    items = GroceryItem.query.filter_by(user_id=user_id).all()
    return jsonify({'grocery_items': [{'id': item.id, 'name': item.name, 'quantity': item.quantity} for item in items]})


# class Cart(db.Model):
#     cart_id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user_profile.user_id'), nullable=False)
#     meal_time = db.Column(db.String(50), nullable=False)
#     meal_name = db.Column(db.Text, nullable=False)

# @app.route('/cart', methods=['POST'])
# def add_to_cart():
#     data = request.json
#     user_id = data.get('user_id')
#     meal_time = data.get('meal_time')
#     meal_name = data.get('meal_name')

    # user = UserProfile.query.filter_by(user_id=user_id).first()
    # if not user:
    #     return jsonify({'message': 'User not found'}), 404

    # cart_item = Cart(user_id=user_id, meal_time=meal_time, meal_name=meal_name)
    # db.session.add(cart_item)
    # db.session.commit()

    # return jsonify({'message': 'Item added to cart successfully'}), 201

# Route to retrieve cart items for a user
# @app.route('/cart/<user_id>', methods=['GET'])
# def get_cart_items(user_id):
#     user = UserProfile.query.filter_by(user_id=user_id).first()
#     if not user:
#         return jsonify({'message': 'User not found'}), 404

#     cart_items = Cart.query.filter_by(user_id=user_id).all()
#     cart_data = [{'meal_time': item.meal_time, 'meal_name': item.meal_name} for item in cart_items]

#     return jsonify({'cart_items': cart_data}), 200
  
@app.route('/recommend_meals',  methods=['POST', 'OPTIONS'])
def recommend_meals():
    user_data = request.json
    user_id = user_data.get('user_id')
    meal_name = user_data.get('meal_name')

    # Fetch diagnosed conditions from the user profile
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()
    diagnosed_conditions = user_profile.diagnosed_conditions if user_profile else []

    # Filter meals based on diagnosed conditions
    filtered_df = df.copy()
    for condition in diagnosed_conditions:
        if condition in threshold_values:
            thresholds = threshold_values[condition]
            for nutrient, value in thresholds.items():
                filtered_df = filtered_df[filtered_df[nutrient] <= value]

    meal_features = df[df['name'] == meal_name][feature_columns].values
    meal_features_str = ' '.join(map(str, meal_features.flatten()))

    # Compute TF-IDF vector for the requested meal
    meal_tfidf = tfidf.transform([meal_features_str])

    # Compute cosine similarity between the requested meal and all other meals
    cosine_similarities = cosine_similarity(meal_tfidf, tfidf_matrix)

    # Find top similar meals
    similar_meal_indices = cosine_similarities.argsort()[0][-5:][::-1]  # Get indices of top 5 similar meals
    similar_meals = df.iloc[similar_meal_indices]['name'].tolist()

    response = {'similar_meals': similar_meals}

    return jsonify(response)



class WeeklyMealPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    week_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.String(50), nullable=False)
    meal_plan = db.Column(db.JSON, nullable=False)  # Store meal plan as JSON

    def __repr__(self):
        return f'<WeeklyMealPlan ID {self.id}, Week {self.week_date}, User {self.user_id}>'

MEAL_TIMES = ['breakfast', 'lunch', 'supper']

@app.route('/weekly_meal_plan',  methods=['POST', 'OPTIONS'])
def generate_weekly_meal_plan():
    user_data = request.json
    user_id = user_data.get('user_id')

    # Fetch diagnosed conditions from the user profile
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()
    diagnosed_conditions = user_profile.diagnosed_conditions if user_profile else []

    # Initialize an empty meal plan dictionary
    weekly_meal_plan = {}

    # Generate a meal plan for each day of the week
    start_date = datetime.now().date()
    for i in range(7):
        day = (start_date + timedelta(days=i)).strftime('%Y-%m-%d')
        daily_meals = generate_daily_meals(diagnosed_conditions)
        weekly_meal_plan[day] = daily_meals

    # Save the generated meal plan in the database
    meal_plan_entry = WeeklyMealPlan(week_date=datetime.now().date(), user_id=user_id, meal_plan=weekly_meal_plan)
    db.session.add(meal_plan_entry)
    db.session.commit()

    return jsonify({'message': 'Weekly meal plan generated successfully.'})

def generate_daily_meals(diagnosed_conditions):
    weekly_meal_plan = {}

    filtered_df = df.copy()
    for condition in diagnosed_conditions:
        if condition in threshold_values:
            thresholds = threshold_values[condition]
            for nutrient, value in thresholds.items():
                filtered_df = filtered_df[filtered_df[nutrient] <= value]

    for meal_time in MEAL_TIMES:
        selected_meals = filtered_df.sample(n=3)['name'].tolist()
        weekly_meal_plan[meal_time] = selected_meals

    return weekly_meal_plan   

@app.route('/weekly_meal_plan/<user_id>', methods=['PUT', 'OPTIONS'])
def regenerate_weekly_meal_plan(user_id):
    # Fetch diagnosed conditions from the user profile
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()
    diagnosed_conditions = user_profile.diagnosed_conditions if user_profile else []

    # Initialize an empty meal plan dictionary
    weekly_meal_plan = {}

    # Generate a meal plan for each day of the week
    start_date = datetime.now().date()
    for i in range(7):
        day = (start_date + timedelta(days=i)).strftime('%Y-%m-%d')
        daily_meals = generate_daily_meals(diagnosed_conditions)
        weekly_meal_plan[day] = daily_meals

    # Update the generated meal plan in the database
    meal_plan_entry = WeeklyMealPlan.query.filter_by(user_id=user_id).first()
    if meal_plan_entry:
        meal_plan_entry.week_date = datetime.now().date()
        meal_plan_entry.meal_plan = weekly_meal_plan
    else:
        meal_plan_entry = WeeklyMealPlan(week_date=datetime.now().date(), user_id=user_id, meal_plan=weekly_meal_plan)
        db.session.add(meal_plan_entry)
    
    db.session.commit()

    return jsonify({'message': 'Weekly meal plan regenerated successfully.'})

@app.route('/weekly_meal_plan/<user_id>', methods=['GET', 'OPTIONS'])
def get_weekly_meal_plans(user_id):
    # Query the database to retrieve the weekly meal plan for the specified user
    weekly_meal_plan_entry = WeeklyMealPlan.query.filter_by(user_id=user_id).first()

    if not weekly_meal_plan_entry:
        return jsonify({'message': 'Weekly meal plan not found for the specified user.'}), 404

    # Extract and return the weekly meal plan
    return jsonify(weekly_meal_plan_entry.meal_plan)


class Feedback(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False)
    recommendation = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # Rating can be on a scale of 1-5
    # Add more fields as needed

    def __repr__(self):
        return f'<Feedback {self.id}>'

# Load the preprocessed dataset
df = pd.read_csv('./dataset.csv')

# Define feature columns and target column
feature_columns = ['calcium_magnesium_ratio', 'vitamin_c_e_ratio', 'total_essential_amino_acids',
                   'saturated_unsaturated_fatty_acids_ratio', 'total_carbohydrates', 'antioxidant_capacity', 'energy_density']

scheduler = BackgroundScheduler()

# Combine features into a single text column
df['features'] = df[feature_columns].apply(lambda x: ' '.join(x.astype(str)), axis=1)

# Compute TF-IDF vectors for the items' features
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['features'])

# Compute cosine similarity between items
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)



@app.route('/profile', methods=['POST', 'OPTIONS'])
def create_profile():
    try:
        # Get user data from the request
        user_data = request.json

        # Create a new user profile
        new_profile = UserProfile(
            user_id=user_data['user_id'],
            name=user_data['name'],
            age=user_data.get('age'),
            password=user_data.get('password'),
            diagnosed_conditions = user_data.get('diagnosed_conditions')
            # Add more fields as needed
        )

        # Add the profile to the database
        db.session.add(new_profile)
        db.session.commit()

        return jsonify({'message': 'Profile created successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/profile/<user_id>', methods=['GET', 'PUT', 'OPTIONS'])
def manage_profile(user_id):
    try:
        if request.method == 'GET':
            # Retrieve user profile data
            user_profile = UserProfile.query.filter_by(user_id=user_id).first()
            if user_profile:
                response = jsonify({
                    'user_id': user_profile.user_id,
                    'name': user_profile.name,
                    'age': user_profile.age,
                    'diagnosed_conditions': user_profile.diagnosed_conditions 
                    # Add more fields as needed
                })
                return response, 200
            else:
                return jsonify({'error': 'User profile not found.'}), 404
        elif request.method == 'PUT':
            # Update user profile data
            user_profile = UserProfile.query.filter_by(user_id=user_id).first()
            if user_profile:
                updated_data = request.json
                user_profile.name = updated_data.get('name', user_profile.name)
                user_profile.age = updated_data.get('age', user_profile.age)
                user_profile.diagnosed_conditions  = updated_data.get('diagnosed_conditions', user_profile.diagnosed_conditions)
                # Update more fields as needed
                db.session.commit()
                response = jsonify({'message': 'Profile updated successfully.'})
                return response, 200
            else:
                return jsonify({'error': 'User profile not found.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    try:
        # Get user data from the request
        user_data = request.json

        # Check if the user already exists
        existing_user = UserProfile.query.filter_by(user_id=user_data['user_id']).first()
        if existing_user:
            return jsonify({'error': 'User already exists.'}), 400

        # Create a new user profile
        new_profile = UserProfile(
            user_id=user_data['user_id'],
            name=user_data['name'],
            age=user_data.get('age'),
            password=user_data['password'],  # Store hashed password securely
            diagnosed_conditions=user_data.get('diagnosed_conditions', [])
            # Add more fields as needed
        )

        # Add the profile to the database
        db.session.add(new_profile)
        db.session.commit()

        return jsonify({'message': 'Sign up successful.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Login endpoint
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    try:
        # Get user credentials from the request
        login_data = request.json
        user_id = login_data['user_id']
        password = login_data['password']

        # Check if the user exists
        user = UserProfile.query.filter_by(user_id=user_id).first()

        # Check if the user exists and the password matches
        if user and user.password == password:
            # Create JWT token with user_id and set it to expire in 30 days
            expires = timedelta(days=30)
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            
            user_data = {
                'user_id': user.user_id,
                'name': user.name,
                'age': user.age,
                'diagnosed_conditions': user.diagnosed_conditions
                # Add more fields as needed
            }

            return jsonify({'access_token': access_token, 'user_profile': user_data}), 200
        else:
            return jsonify({'error': 'Invalid credentials.'}), 401
    except Exception as e:
        # Print the error message to the console for debugging
        print(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred while processing the request.'}), 500


@app.route('/logout', methods=['POST', 'OPTIONS'])
def logout():
    try:
        # Clear the user's session data
        session.clear()
        return jsonify({'message': 'Logged out successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

        
@app.route('/check_meal/<user_id>', methods=['POST', 'OPTIONS'])
def check_meal_fit(user_id):
    # Get user's diagnosed conditions
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()
    if user_profile is None:
        return jsonify({'error': 'User not found'}), 404
    
    diagnosed_conditions = user_profile.diagnosed_conditions

    # Get meal name from request data
    meal_data = request.json
    meal_name = meal_data.get('meal_name')

    # Fetch the meal from the dataset
    meal_row = df[df['name'] == meal_name]

    if meal_row.empty:
        return jsonify({'message': 'Meal not found.'}), 404

    # Check if the meal fits the user's dietary requirements based on threshold values
    meal_fit = True
    for condition in diagnosed_conditions:
        if condition in threshold_values:
            thresholds = threshold_values[condition]
            for nutrient, value in thresholds.items():
                if nutrient in meal_row.columns:
                    nutrient_value = meal_row[nutrient].values[0]  # Get nutrient value from the row
                    if nutrient_value > value:
                        meal_fit = False
                        break
                if not meal_fit:
                    break

    return jsonify({'meal_fit': meal_fit})

def is_meal_fit_for_user(meal_data, threshold_values):
    # Check if the meal passes the threshold test
    for condition, thresholds in threshold_values.items():
        for key, value in thresholds.items():
            if meal_data[key].iloc[0] < value:
                return False  # Meal does not pass the threshold test
    return True  # Meal passes the threshold test


@app.route('/grocery/buy-all', methods=['POST'])
def buy_all_grocery_items():
    try:
        data = request.json
        user_id = data.get('user_id')

        # Delete all grocery items associated with the user_id
        GroceryItem.query.filter_by(user_id=user_id).delete()
        db.session.commit()

        return jsonify({'message': 'All items purchased successfully and removed from the grocery list.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/feedback', methods=['POST', 'OPTIONS'])
def provide_feedback():
    try:
        # Get feedback data from the request
        feedback_data = request.json

        # Create a new feedback entry
        new_feedback = Feedback(
            user_id=feedback_data['user_id'],
            recommendation=feedback_data['recommendation'],
            rating=feedback_data['rating']
            # Add more fields as needed
        )

        # Add the feedback to the database
        db.session.add(new_feedback)
        db.session.commit()

        return jsonify({'message': 'Feedback recorded successfully.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  
    

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
