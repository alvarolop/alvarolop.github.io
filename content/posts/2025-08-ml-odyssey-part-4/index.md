---
title: "ML Odyssey: Part 4 - Exploratory Data Analysis with Pokemon Dataset I"
date: 2025-08-22
draft: false
params:
  author: Álvaro López
tags: ["machine-learning", "python", "pandas", "data-visualization", "pokemon"]
categories: ["ML Odyssey"]

description: "Learn how to analyze and visualize data using Python's most powerful libraries through a fun Pokemon dataset"
summary: "Learn how to analyze and visualize data using Python's most powerful libraries through a fun Pokemon dataset"

resources:
- name: "featured-image"
  src: "featured-image.png"
---


<style>
.code-container {
    position: relative;
}

.code-output-toggle {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
    transition: background-color 0.3s ease;
}

.code-output-toggle:hover {
    background-color: #e0e0e0;
}

.code-output {
    display: none;
    background-color: #f9f9f9;
    border-left: 3px solid #007bff;
    padding: 15px;
    margin-top: 15px;
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
}

.code-output.visible {
    display: block;
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.output-diagram img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
    border: 1px solid #ddd;
}
</style>

<script>
function toggleOutput(element) {
    const outputDiv = element.nextElementSibling;
    const isVisible = outputDiv.classList.toggle('visible');
    element.innerHTML = isVisible ? '🚀 Hide Output' : '👉 Show Output';
}
</script>

{{< admonition type=note title="Note" open=true >}}
In our [previous posts](/2025/08/ml-odyssey-part-3-statistical-analysis-eda-theory/), we explored both the programming fundamentals with pandas, matplotlib, and seaborn (Part 2), and the statistical concepts behind effective data analysis (Part 3). Today, we'll apply everything we've learned to real data analysis.
{{< /admonition >}}


## 🕵️‍♂️ The Case of the Infiltrated Kanto Region

*The year is 2025. The peaceful Kanto region, once known for its friendly Pokemon battles and cooperative trainers, has fallen under a dark shadow. Team Rocket, the notorious criminal organization, has been quietly infiltrating the region, recruiting trainers to their malevolent cause.*

*As elite detectives of the Kanto Investigation Bureau, you've been assigned a critical mission: **identify the hidden Team Rocket operatives** before they can complete their sinister plans.*

---

### 🚨 **The Mission Briefing**

<div style="display: flex; align-items: flex-start; gap: 20px; margin: 20px 0;">

<div style="flex: 0 0 30%; text-align: center;">
<img src="pikachu-intro.png" alt="Detective Pikachu" style="width: 100%;  border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
<p style="font-style: italic; margin-top: 10px; font-size: 0.9em; color: #666;"><b>Detective Pikachu is ready to assist in the investigation!</b></p>
</div>

<div style="flex: 1;">

**Region:** Kanto   
**Threat Level:** CRITICAL  
**Time Pressure:** IMMEDIATE  

**The Situation:**
- **5,000 Pokemon trainers** are under investigation
- **4,000 trainers** have been classified (Team Rocket or innocent)
- **1,000 trainers** remain **UNLABELED** - their true allegiance is unknown
- Team Rocket's influence is spreading rapidly

**Your Mission:**  
Use every analytical tool at your disposal to identify which of the 1,000 unlabeled trainers are secretly working for Team Rocket. The fate of Kanto depends on your detective skills!

**Your Arsenal:**
- 🐍 **Python**: The foundation of your investigation toolkit
- 📦 **NumPy & pandas**: For powerful data handling and manipulation
- 📊 **matplotlib & seaborn**: To visualize patterns and uncover hidden clues
- 📈 **scipy**: For rigorous statistical analysis and hypothesis testing
- 🧠 And your own detective logic and curiosity!
</div>

</div>

---

### 🎯 **The Investigation Begins**

*The clock is ticking. Team Rocket operatives are hiding in plain sight, using their Pokemon training skills for criminal purposes. But every criminal leaves traces - patterns in their behavior, preferences, and choices that can reveal their true nature.*

*Are you ready to become the detective Kanto needs?*

*Let's begin the investigation...*

## 🔍 **Step 1: Accessing the Evidence Database**

*Your first task as a detective is to access the classified evidence database. The Kanto Investigation Bureau has compiled extensive records on all 5,000 trainers under suspicion.*

*We'll load the evidence directly from the secure database using our analytical tools. This approach ensures we have access to the most up-to-date information without compromising security protocols.*

```python {open=true, lineNos=true}
import pandas as pd

# Load the Pokemon Team Rocket dataset directly from GitHub
dataset_url = "https://raw.githubusercontent.com/alvarolop/ml-odyssey/main/datasets/pokemon_team_rocket_dataset.csv"

print("Loading Pokemon Team Rocket dataset from GitHub...")
all_pokemon_df = pd.read_csv(dataset_url)
print(f"Dataset loaded successfully! Shape: {all_pokemon_df.shape}")

# Alternative: Download and save locally if you prefer
# pokemon_df.to_csv('pokemon_team_rocket_dataset.csv', index=False)
# print("Dataset also saved locally as 'pokemon_team_rocket_dataset.csv'")
```


{{< codeoutput title="Command Output" >}}
Loading Pokemon Team Rocket dataset from GitHub...
Dataset loaded successfully! Shape: (5000, 18)
{{< /codeoutput >}}









## 🎯 **Step 2: Organizing the Evidence Files**

*The evidence database contains a mix of classified and unclassified information. As a skilled detective, you need to organize this evidence systematically:*

* **Classified Evidence (4,000 cases)**: Trainers whose Team Rocket affiliation has been confirmed or cleared
* **Unclassified Evidence (1,000 cases)**: Trainers under active investigation - their true allegiance remains unknown

*This organization will allow us to learn from known patterns and apply our findings to identify the hidden operatives.*


```python {open=true, lineNos=true}
# --- Split the dataset into training and prediction sets ---
pokemon_df = all_pokemon_df[all_pokemon_df['Team Rocket'].notnull()].copy()
predict_df = all_pokemon_df[all_pokemon_df['Team Rocket'].isnull()].copy()

# --- Confirm the dataset sizes ---
print(f'Size of the labeled dataset (To Train): {pokemon_df.shape}')
print(f'Size of the non-labeled dataset (To predict): {predict_df.shape}')
```


{{< codeoutput title="Command Output" >}}
Size of the labeled dataset (To Train): (4000, 18)
Size of the non-labeled dataset (To predict): (1000, 18)
{{< /codeoutput >}}

## 📊 **Step 3: Initial Evidence Analysis**

*Now that we have our evidence organized, it's time to conduct our first forensic analysis. We'll examine the classified evidence to understand the patterns and characteristics that distinguish Team Rocket operatives from innocent trainers.*

```python {open=true, lineNos=true}
import matplotlib.pyplot as plt
import seaborn as sns
# --- Refined Basic Exploration ---
print(f"{'='*50}\n{'DATASET OVERVIEW':^50}\n{'='*50}")
print(f"Total Number of Pokemon: {len(pokemon_df)}\n")
print(f"Features (Columns) Available: {', '.join(pokemon_df.columns.tolist())}\n")

print(f"\n{'='*50}\n{'DATA TYPES AND NON-NULL COUNTS':^50}\n{'='*50}")
pokemon_df.info()

# --- Refined Basic Statistics ---
print(f"\n{'='*50}\n{'BASIC STATISTICAL SUMMARY':^50}\n{'='*50}")
# Transpose the describe output for better readability (features as rows)
print(pokemon_df.describe().T.to_string())

# --- Display the first few rows ---
print(f"\n{'='*50}\n{'FIRST 5 POKEMON RECORDS':^50}\n{'='*50}")
print(pokemon_df.head().to_string()) # Use .to_string() for better console formatting
```

{{< codeoutput title="Command Output" >}}
==================================================
                 DATASET OVERVIEW                 
==================================================
Total Number of Pokemon: 4000

Features (Columns) Available: ID, Age, City, Economic Status, Profession, Most Used Pokemon Type, Average Pokemon Level, Criminal Record, PokéBall Usage, Win Ratio, Number of Gym Badges, Is Pokemon Champion, Battle Strategy, Number of Migrations, Rare Item Holder, Debt to Kanto, Charity Participation, Team Rocket


==================================================
          DATA TYPES AND NON-NULL COUNTS          
==================================================
<class 'pandas.core.frame.DataFrame'>
Index: 4000 entries, 0 to 3999
Data columns (total 18 columns):
 #   Column                  Non-Null Count  Dtype 
---  ------                  --------------  ----- 
 0   ID                      4000 non-null   int64 
 1   Age                     4000 non-null   int64 
 2   City                    4000 non-null   object
 3   Economic Status         4000 non-null   object
 4   Profession              4000 non-null   object
 5   Most Used Pokemon Type  4000 non-null   object
 6   Average Pokemon Level   4000 non-null   int64 
 7   Criminal Record         4000 non-null   int64 
 8   PokéBall Usage          4000 non-null   object
 9   Win Ratio               4000 non-null   int64 
 10  Number of Gym Badges    4000 non-null   int64 
 11  Is Pokemon Champion     4000 non-null   bool  
 12  Battle Strategy         4000 non-null   object
 13  Number of Migrations    4000 non-null   int64 
 14  Rare Item Holder        4000 non-null   bool  
 15  Debt to Kanto           4000 non-null   int64 
 16  Charity Participation   4000 non-null   bool  
 17  Team Rocket             4000 non-null   object
dtypes: bool(3), int64(8), object(7)
memory usage: 511.7+ KB

==================================================
            BASIC STATISTICAL SUMMARY             
==================================================
                        count         mean           std   min       25%      50%       75%       max
ID                     4000.0   1999.50000   1154.844867   0.0    999.75   1999.5   2999.25    3999.0
Age                    4000.0     40.36150     17.511781  10.0     25.00     41.0     55.00      70.0
Average Pokemon Level  4000.0     52.08400     27.527057   5.0     28.00     52.0     76.00     100.0
Criminal Record        4000.0      0.09000      0.286218   0.0      0.00      0.0      0.00       1.0
Win Ratio              4000.0     53.30275     19.024407  20.0     37.00     53.0     70.00      90.0
Number of Gym Badges   4000.0      2.23150      1.988441   0.0      1.00      2.0      4.00       8.0
Number of Migrations   4000.0     13.24000      7.818867   0.0      6.00     13.0     20.00      30.0
Debt to Kanto          4000.0  78168.56225  79362.972594  37.0  30233.50  59916.5  88226.25  398601.0

==================================================
             FIRST 5 POKEMON RECORDS              
==================================================
   ID  Age           City Economic Status            Profession Most Used Pokemon Type  Average Pokemon Level  Criminal Record PokéBall Usage  Win Ratio  Number of Gym Badges  Is Pokemon Champion Battle Strategy  Number of Migrations  Rare Item Holder  Debt to Kanto  Charity Participation Team Rocket
0   0   27    Pewter City          Middle             Fisherman                   Rock                     50                0       DuskBall         51                     1                False   Unpredictable                    25             False          24511                   True          No
1   1   55  Viridian City          Middle       PokéMart Seller                  Grass                     35                1       HealBall         53                     2                False   Unpredictable                    19             False         177516                   True         Yes
2   2   14    Pallet Town            High        Police Officer                 Poison                     96                0        NetBall         76                     5                False      Aggressive                    18             False          85695                   True          No
3   3   41  Cerulean City          Middle  Gym Leader Assistant                 Dragon                     23                0      UltraBall         27                     0                False       Defensive                    10             False          39739                   True          No
4   4   15    Pallet Town          Middle  Gym Leader Assistant                 Ground                     16                1       HealBall         51                     1                False      Aggressive                    17              True         126923                  False         Yes
{{< /codeoutput >}}






<!-- # --- Type distribution ---
print(f"\n{'='*50}\n{'POKEMON TYPE DISTRIBUTION':^50}\n{'='*50}")
type_counts = pokemon_df['Most Used Pokemon Type'].value_counts()
type_counts_df = type_counts.reset_index() # Convert Series to DataFrame
type_counts_df.columns = ['Type', 'Count'] # Rename columns for clarity in plotting in this new df
print(type_counts.to_string()) # Use .to_string() for better console formatting

# --- Visualize type distribution ---
print(f"\n{'='*50}\n{'VISUALIZATION: TYPE DISTRIBUTION':^50}\n{'='*50}")
plt.figure(figsize=(12, 7)) # Slightly larger figure
sns.barplot(x='Type', y='Count', hue='Type', data=type_counts_df, palette='viridis', legend=False)

plt.xlabel('Pokemon Type', fontsize=12) # Add x-label
plt.ylabel('Number of Pokemon', fontsize=12) # Add y-label
plt.xticks(rotation=45, ha='right', fontsize=10) # Rotate and align for better readability
plt.yticks(fontsize=10)
plt.title('Distribution of Pokemon Primary Types', fontsize=14, fontweight='bold')
plt.grid(axis='y', linestyle='--', alpha=0.7) # Add a subtle grid
plt.tight_layout() # Adjusts plot parameters for a tight layout
plt.show() -->


## 🎯 **Step 4: Analyzing the Known Suspects**

*With our initial evidence analysis complete, we now turn our attention to the most critical piece of information: the known Team Rocket operatives. Understanding their characteristics is key to identifying the hidden ones.*

```python {open=true, lineNos=true}
# --- Review the objective labels proportionality and counts ---
print("Distribution of the 'Team Rocket' objective variable (proportion):")
print(pokemon_df['Team Rocket'].value_counts(normalize=True))
print("\nCount of each class in the 'Team Rocket' objective variable:")
print(pokemon_df['Team Rocket'].value_counts())

# --- Visualize the objective labels ---
sns.countplot(x='Team Rocket', hue='Team Rocket', data=pokemon_df, palette='viridis', legend=False)
plt.title('Distribution of the "Team Rocket" Objective Variable')
plt.ylabel('Count')
plt.xlabel('Does it belong to Team Rocket?')
plt.show()
```

{{< codeoutput title="Pokemon Analysis Results" >}}
Distribution of the 'Team Rocket' objective variable (proportion):
Team Rocket
No     0.82
Yes    0.18
Name: proportion, dtype: float64

Count of each class in the 'Team Rocket' objective variable:
Team Rocket
No     3280
Yes     720
Name: count, dtype: int64

![Plot](pokemon_files/03-04-pokemon_3_1.png)
{{< /codeoutput >}}

## 🔐 **Step 5: Decoding the Evidence**

*As any seasoned detective knows, evidence comes in many forms. Some clues are straightforward numbers, while others are coded messages that need to be deciphered. In our case, many of the trainer characteristics are stored as text categories that our analytical tools can't process directly.*

{{< admonition type=warning title="🔍 Why Coded Evidence Needs Decoding" open=true >}}
Our detective tools require **numerical evidence** to work properly. However, many clues in our case files are **coded as text**—categories like `"Most Used Pokemon Type"`, `"City"`, `"Profession"`, or `"PokéBall Usage"`.

**Why is this a problem?**
- Our analytical algorithms can't process text categories as mathematical evidence.
- Coded evidence must be **converted to numbers** so our tools can analyze patterns.
- Without decoding, our investigation will fail to uncover the hidden patterns.

**Types of Coded Evidence:**
- **Nominal Codes:** No natural order (e.g., `"City"`, `"Most Used Pokemon Type"`)
- **Ordinal Codes:** Have a meaningful order (e.g., `"Economic Status"`: Low < Middle < High)

**How do we decode it?**
- We use **decoding techniques** (like Label Encoding or One-Hot Encoding) to transform these codes into numbers.
- The choice of decoding method depends on the type of evidence and our analytical approach.

In this step, we'll use `LabelEncoder` to decode our categorical evidence into a format our detective tools can process!
{{< /admonition >}}

*First, let's examine what types of coded evidence we're dealing with:*


```python {open=true, lineNos=true}
# --- Step 1: Identify categorical variables ---
categorical_vars = pokemon_df.select_dtypes(include='object').columns

# --- Step 2: Analyze categorical variables ---
print(f"{'='*50}\n{'Number of categories per categorical variable':^50}\n{'='*50}")
for col in categorical_vars:
    num_categories = pokemon_df[col].nunique()
    print(f"{col}: {num_categories} categories")

print(f"{'='*50}\n{'Sample values for each categorical variable':^50}\n{'='*50}")
for col in categorical_vars:
    unique_values = pokemon_df[col].unique()
    # Show first 5 unique values for readability
    sample_values = unique_values[:5] if len(unique_values) > 5 else unique_values
    print(f"\n{col}:")
    print(f"  Sample values: {list(sample_values)}")
    if len(unique_values) > 5:
        print(f"  ... and {len(unique_values) - 5} more categories")
```


{{< codeoutput title="Pokemon Analysis Results" >}}
==================================================
  Number of categories per categorical variable   
==================================================
City: 10 categories
Economic Status: 3 categories
Profession: 16 categories
Most Used Pokemon Type: 18 categories
PokéBall Usage: 10 categories
Battle Strategy: 3 categories
Team Rocket: 2 categories
==================================================
   Sample values for each categorical variable    
==================================================

City:
  Sample values: ['Pewter City', 'Viridian City', 'Pallet Town', 'Cerulean City', 'Lavender Town']
  ... and 5 more categories

Economic Status:
  Sample values: ['Middle', 'High', 'Low']

Profession:
  Sample values: ['Fisherman', 'PokéMart Seller', 'Police Officer', 'Gym Leader Assistant', 'Daycare Worker']
  ... and 11 more categories

Most Used Pokemon Type:
  Sample values: ['Rock', 'Grass', 'Poison', 'Dragon', 'Ground']
  ... and 13 more categories

PokéBall Usage:
  Sample values: ['DuskBall', 'HealBall', 'NetBall', 'UltraBall', 'TimerBall']
  ... and 5 more categories

Battle Strategy:
  Sample values: ['Unpredictable', 'Aggressive', 'Defensive']

Team Rocket:
  Sample values: ['No', 'Yes']
{{< /codeoutput >}}

Now, we can apply the `LabelEncoder` class from scikit-learn to our categorical variables.

```python {open=true, lineNos=true}
from sklearn.preprocessing import LabelEncoder

# --- Step 3: Apply Label Encoding ---
print(f"{'='*50}\n{'Applying Label Encoding to categorical variables...':^50}\n{'='*50}")
label_encoders = {} # Dictionary to store label encoders for later use

# Apply label encoding to all categorical variables
for col in categorical_vars:
    if col != 'Team Rocket':
      le = LabelEncoder()
      pokemon_df[col] = le.fit_transform(pokemon_df[col].astype(str))
      predict_df[col] = le.fit_transform(predict_df[col].astype(str))
      label_encoders[col] = le
      
      print(f"\n✅ Encoded '{col}':")
      print(f"   Pokemon Dataset: {list(pokemon_df[col].unique()[:3])}")
      print(f"   Predict Dataset:  {list(predict_df[col].unique()[:3])}")

print(f"\n📊 Encoding complete! Dataset shape: {pokemon_df.shape}")
print(f"📋 All variables are now numerical and ready for ML algorithms!")

# Print the label_encoders dictionary to show the mapping for each column
print(f"\n🔑 Label Encoders mapping per column:")
for col, le in label_encoders.items():
    print(f"  {col}: {dict(zip(le.classes_, le.transform(le.classes_)))}")

# Display the first few rows to see the transformation
print(f"\n👀 First 3 rows of encoded dataset:")
print(pokemon_df.head(3))
```

{{< codeoutput title="Pokemon Analysis Results" >}}
==================================================
Applying Label Encoding to categorical variables...
==================================================

✅ Encoded 'City':
   Pokemon Dataset: [np.int64(6), np.int64(9), np.int64(5)]
   Predict Dataset:  [np.int64(5), np.int64(1), np.int64(9)]

✅ Encoded 'Economic Status':
   Pokemon Dataset: [np.int64(2), np.int64(0), np.int64(1)]
   Predict Dataset:  [np.int64(1), np.int64(2), np.int64(0)]

✅ Encoded 'Profession':
   Pokemon Dataset: [np.int64(7), np.int64(10), np.int64(11)]
   Predict Dataset:  [np.int64(14), np.int64(12), np.int64(15)]

✅ Encoded 'Most Used Pokemon Type':
   Pokemon Dataset: [np.int64(15), np.int64(9), np.int64(13)]
   Predict Dataset:  [np.int64(5), np.int64(3), np.int64(6)]

✅ Encoded 'PokéBall Usage':
   Pokemon Dataset: [np.int64(1), np.int64(3), np.int64(6)]
   Predict Dataset:  [np.int64(9), np.int64(8), np.int64(1)]

✅ Encoded 'Battle Strategy':
   Pokemon Dataset: [np.int64(2), np.int64(0), np.int64(1)]
   Predict Dataset:  [np.int64(0), np.int64(2), np.int64(1)]

📊 Encoding complete! Dataset shape: (4000, 18)
📋 All variables are now numerical and ready for ML algorithms!

🔑 Label Encoders mapping per column:
  City: {'Celadon City': np.int64(0), 'Cerulean City': np.int64(1), 'Cinnabar Island': np.int64(2), 'Fuchsia City': np.int64(3), 'Lavender Town': np.int64(4), 'Pallet Town': np.int64(5), 'Pewter City': np.int64(6), 'Saffron City': np.int64(7), 'Vermilion City': np.int64(8), 'Viridian City': np.int64(9)}
  Economic Status: {'High': np.int64(0), 'Low': np.int64(1), 'Middle': np.int64(2)}
  Profession: {'Biker': np.int64(0), 'Black Market Dealer': np.int64(1), 'Breeder': np.int64(2), 'Casino Worker': np.int64(3), 'Champion': np.int64(4), 'Daycare Worker': np.int64(5), 'Elite Trainer': np.int64(6), 'Fisherman': np.int64(7), 'Gym Leader Assistant': np.int64(8), 'Nurse': np.int64(9), 'PokéMart Seller': np.int64(10), 'Police Officer': np.int64(11), 'Researcher': np.int64(12), 'Rocket Grunt': np.int64(13), 'Scientist': np.int64(14), 'Underground Battler': np.int64(15)}
  Most Used Pokemon Type: {'Bug': np.int64(0), 'Dark': np.int64(1), 'Dragon': np.int64(2), 'Electric': np.int64(3), 'Fairy': np.int64(4), 'Fighting': np.int64(5), 'Fire': np.int64(6), 'Flying': np.int64(7), 'Ghost': np.int64(8), 'Grass': np.int64(9), 'Ground': np.int64(10), 'Ice': np.int64(11), 'Normal': np.int64(12), 'Poison': np.int64(13), 'Psychic': np.int64(14), 'Rock': np.int64(15), 'Steel': np.int64(16), 'Water': np.int64(17)}
  PokéBall Usage: {'DarkBall': np.int64(0), 'DuskBall': np.int64(1), 'GreatBall': np.int64(2), 'HealBall': np.int64(3), 'LuxuryBall': np.int64(4), 'MasterBall': np.int64(5), 'NetBall': np.int64(6), 'PokéBall': np.int64(7), 'TimerBall': np.int64(8), 'UltraBall': np.int64(9)}
  Battle Strategy: {'Aggressive': np.int64(0), 'Defensive': np.int64(1), 'Unpredictable': np.int64(2)}

👀 First 3 rows of encoded dataset:
   ID  Age  City  Economic Status  Profession  Most Used Pokemon Type  \
0   0   27     6                2           7                      15   
1   1   55     9                2          10                       9   
2   2   14     5                0          11                      13   

   Average Pokemon Level  Criminal Record  PokéBall Usage  Win Ratio  \
0                     50                0               1         51   
1                     35                1               3         53   
2                     96                0               6         76   

   Number of Gym Badges  Is Pokemon Champion  Battle Strategy  \
0                     1                False                2   
1                     2                False                2   
2                     5                False                0   

   Number of Migrations  Rare Item Holder  Debt to Kanto  \
0                    25             False          24511   
1                    19             False         177516   
2                    18             False          85695   

   Charity Participation Team Rocket  
0                   True          No  
1                   True         Yes  
2                   True          No  
{{< /codeoutput >}}

{{< admonition type=tip title="Best Practice: Preserve Your Original Data" open=true >}}
For simplicity, in this tutorial we encode categorical variables directly in the original DataFrame variables (`pokemon_df`, `predict_df`).  
**However, in real-world projects, it's best to keep your original data untouched and create a new DataFrame for the encoded data.**  
Here's how you could do it:

```python {open=true, lineNos=true}
# Alternative: Create a new encoded DataFrame to preserve the original
encoded_df = pokemon_df.copy()
for col in categorical_vars:
    le = LabelEncoder()
    encoded_df[col] = le.fit_transform(encoded_df[col].astype(str))
```
{{< /admonition >}}




## 🕵️‍♂️ **The Investigation: 10 Critical Questions**

*Now that our evidence is properly decoded and ready for analysis, it's time to begin the systematic investigation. The Kanto Investigation Bureau has identified 10 critical questions that could reveal the hidden Team Rocket operatives. Each question represents a different line of inquiry that could lead us to the truth.*

**This investigation is split across three blog posts for maximum clarity, each focusing on a different analytical approach:**

**In this post (Part 4):**  
*Focus: Parametric statistical analysis (tests that assume normality, e.g., t-tests, ANOVA)*
* Q1. Do certain Pokémon types indicate suspicious behavior?
* Q2. Is economic status a reliable predictor of criminal affiliation?
* Q3. Do Team Rocket members have a preference for specific PokéBalls?
* Q4. Does a high battle win ratio correlate with Team Rocket membership?

**In Part 5:**  
*Focus: Non-parametric and geospatial analysis (robust to non-normal data, plus spatial patterns)*
* Q5. Are migration patterns different for Team Rocket members?
* Q6. Do Rocket members tend to avoid charity participation?
* Q7. Do Rocket members disguise themselves in certain professions?
* Q8. Is there an unusual cluster of Rocket members in specific cities?
* Q9. How does badge count affect the likelihood of being a Rocket member?

**In Part 6:**  
*Focus: Multidimensionality reduction and advanced feature interactions*
* Q10. Are there any multi-feature interactions that reveal hidden Rocket operatives?

*In this section, we'll outline these investigative questions and the forensic techniques we'll use to answer them.*

## Q1. Do certain Pokémon types indicate suspicious behavior?

*Our first line of inquiry examines whether Team Rocket operatives have preferences for specific Pokémon types. This could reveal their strategic choices and help us identify patterns in their training methods.*

* 📈 **Evidence Visualization**: Stacked bar chart comparing Pokémon type distribution between Rocket & non-Rocket members.
* 🎯 **Forensic Test**: Chi-square test for correlation analysis.

```python {open=true, lineNos=true}
from scipy.stats import chi2_contingency

# Group by Team Rocket status and Pokemon type, count occurrences
type_status_counts = pd.crosstab(
  pokemon_df['Most Used Pokemon Type'],
  pokemon_df['Team Rocket']
)

# Map the integer index back to the original type names for the x-axis
type_status_counts.index = label_encoders['Most Used Pokemon Type'].inverse_transform(type_status_counts.index)

# Plot stacked bar chart
type_status_counts.plot(
  kind='bar',
  stacked=True,
  figsize=(10, 6),
  colormap='plasma'
)
plt.title('Pokémon Type Distribution: Rocket vs Non-Rocket')
plt.xlabel('Pokémon Type')
plt.ylabel('Count')
plt.xticks(rotation=45, ha='right')
plt.legend(title='Team Rocket')
plt.tight_layout()
plt.show()

# Chi-square test for independence using scipy
chi2, p, dof, expected = chi2_contingency(type_status_counts)
print(f"Chi-square statistic: {chi2:.2f}")
print(f"p-value: {p:.4f}")
if p < 0.05:
  print("Result: 🏆 Significant association between Pokémon type and Team Rocket membership.")
else:
  print("Result: 🧐 No significant association found.")
```

{{< codeoutput title="Pokemon Analysis Results" >}}

![Pikachu Introduction](pokemon_files/03-04-pokemon_6_0.png)
Chi-square statistic: 20.56
p-value: 0.2467
Result: No significant association found.
{{< /codeoutput >}}



## Q2.  Is economic status a reliable predictor of criminal affiliation?

* 📊 Graph: Box plot of debt and economic status per Team Rocket status.
* 🏦 Test: ANOVA test for group differences.


We'll analyze two distinct economic aspects: **debt levels** and **economic status**. These are different variables that might each reveal different patterns about Team Rocket membership. We'll use ANOVA (Analysis of Variance) from `scipy.stats` to test if there are statistically significant differences between groups.

**Part A: Debt Analysis**
* 📊 Graph: Box plot of debt per Team Rocket status.
* 🏦 Test: ANOVA test for group differences.

```python {open=true, lineNos=true}
from scipy.stats import f_oneway

# Box plot: Debt by Team Rocket status
plt.figure(figsize=(10, 6))
sns.boxplot(
  data=pokemon_df,
  x='Team Rocket',
  y='Debt to Kanto',
  hue='Team Rocket',
  palette='Set2',
  legend=False
)
plt.title('Debt Distribution by Team Rocket Status')
plt.xlabel('Team Rocket Member')
plt.ylabel('Debt to Kanto')
plt.show()

# ANOVA test for Debt to Kanto
debt_groups = [
  group['Debt to Kanto'].dropna()
  for _, group in pokemon_df.groupby('Team Rocket')
]
debt_anova = f_oneway(*debt_groups)
print(f"Debt to Kanto ANOVA F-statistic: {debt_anova.statistic:.2f}")
print(f"Debt to Kanto ANOVA p-value: {debt_anova.pvalue:.4f}")

if debt_anova.pvalue < 0.05:
  print("Result: 🏆 Significant debt differences found between Team Rocket and non-Team Rocket members.")
else:
  print("Result: 🧐 No significant debt differences found.")
```


{{< codeoutput title="Pokemon Analysis Results" >}}
![Pikachu Introduction](pokemon_files/03-04-pokemon_7_0.png)
Debt to Kanto ANOVA F-statistic: 4825.47
Debt to Kanto ANOVA p-value: 0.0000
Result: Significant debt differences found between Team Rocket and non-Team Rocket members.
{{< /codeoutput >}}

**Part B: Economic Status Analysis**
* 📊 Graph: Count plot of economic status per Team Rocket status.
* 💰 Test: ANOVA test for group differences.

```python {open=true, lineNos=true}
# Count plot: Economic Status by Team Rocket status
plt.figure(figsize=(10, 6))
sns.countplot(
  data=pokemon_df,
  x='Economic Status',
  hue='Team Rocket',
  palette='Set3'
)
plt.title('Economic Status Frequency by Team Rocket Status')
plt.xlabel('Economic Status')
plt.ylabel('Count')

# Replace numeric labels with original string labels on X-axis
ax = plt.gca()
numeric_labels = [int(label.get_text()) for label in ax.get_xticklabels()]
original_labels = label_encoders['Economic Status'].inverse_transform(numeric_labels)
ax.set_xticks(numeric_labels)  # Set tick positions first
ax.set_xticklabels(original_labels, rotation=15)  # Then set labels

plt.tight_layout()
plt.show()

# ANOVA test for Economic Status
# Economic Status is already encoded as numeric, so we can use it directly
econ_groups = [
  group['Economic Status'].dropna()
  for _, group in pokemon_df.groupby('Team Rocket')
]
econ_anova = f_oneway(*econ_groups)
print(f"Economic Status ANOVA F-statistic: {econ_anova.statistic:.2f}")
print(f"Economic Status ANOVA p-value: {econ_anova.pvalue:.4f}")

if econ_anova.pvalue < 0.05:
  print("Result: 🏆 Significant economic status differences found between Team Rocket and non-Team Rocket members.")
else:
  print("Result: 🧐 No significant economic status differences found.")
```

{{< codeoutput title="Pokemon Analysis Results" >}}
![Pikachu Introduction](pokemon_files/03-04-pokemon_8_0.png)
Economic Status ANOVA F-statistic: 0.36
Economic Status ANOVA p-value: 0.5502
Result: No significant economic status differences found.
{{< /codeoutput >}}

## Q3. Do Team Rocket members have a preference for specific PokéBalls?

* 🎨 Graph: Heatmap of PokéBall usage vs. Team Rocket status.
* ⚡ Test: Chi-square test for independence.

```python {open=true, lineNos=true}
# --- Heatmap of PokéBall usage vs Team Rocket status ---
# Step 1: Create a cross-tab of counts
pokeball_ct = pd.crosstab(pokemon_df['PokéBall Usage'], pokemon_df['Team Rocket'])

# Step 2: Normalize by column (each column will sum to 1.0 or 100%)
pokeball_percent = pokeball_ct.div(pokeball_ct.sum(axis=0), axis=1).multiply(100)

pokeball_percent.index = label_encoders['PokéBall Usage'].inverse_transform(pokeball_percent.index)

# Step 3: Format labels with % sign and no decimals
# The fix is here: changed from "{x:.1f}%" to "{x:.0f}%"
labels = pokeball_percent.map(lambda x: f"{x:.0f}%")

# Step 4: Plot
sns.heatmap(pokeball_percent, annot=labels, fmt='', cmap='coolwarm')
plt.title('PokéBall Usage (% within Team Rocket groups)')
plt.xlabel('Team Rocket Status')
plt.ylabel('PokéBall Usage')
plt.show()

# Chi-square test for independence
chi2, p, _, _ = chi2_contingency(pokeball_ct)
print(f"Chi-square statistic: {chi2:.2f}")
print(f"p-value: {p:.4f}")
if p < 0.05:
    print("Result: 🏆 Significant association between PokéBall usage and Team Rocket membership.")
else:
    print("Result: 🧐 No significant association found.")
```

{{< codeoutput title="Pokemon Analysis Results" >}}
![Pikachu Introduction](pokemon_files/03-04-pokemon_9_0.png)
Chi-square statistic: 23.22
p-value: 0.0057
Result: 🏆 Significant association between PokéBall usage and Team Rocket membership.
{{< /codeoutput >}}

## Q4. Does a high battle win ratio correlate with Team Rocket membership?

* 📉 Graph: KDE plot of win ratio distribution for both groups.
* 🏆 Test: T-test for mean differences.

**Part A: Data Preparation and Visualization**

We'll analyze the win ratio distributions for both Team Rocket and non-Team Rocket members using a KDE plot to visualize the differences:

```python {open=true, lineNos=true}
from scipy.stats import ttest_ind

# Separate win ratio data by Team Rocket membership
win_ratio_rocket = pokemon_df[pokemon_df['Team Rocket'] == 'Yes']['Win Ratio'].dropna()
win_ratio_nonrocket = pokemon_df[pokemon_df['Team Rocket'] == 'No']['Win Ratio'].dropna()

# Calculate means for comparison
mean_rocket = win_ratio_rocket.mean()
mean_nonrocket = win_ratio_nonrocket.mean()
print(f"Mean Win Ratio - Team Rocket: {mean_rocket:.2f}, Non-Rocket: {mean_nonrocket:.2f}\n")

# Create KDE plot with mean indicators
plt.figure(figsize=(10, 6))
colors = sns.color_palette('mako', n_colors=2)
sns.kdeplot(data=pokemon_df, x='Win Ratio', hue='Team Rocket', fill=True, common_norm=False, palette=colors)

# Add mean lines
plt.axvline(x=mean_rocket, color=colors[1], linestyle='--', label=f"Rocket Mean: {mean_rocket:.2f}")
plt.axvline(x=mean_nonrocket, color=colors[0], linestyle='--', label=f"Non-Rocket Mean: {mean_nonrocket:.2f}")

plt.title('Win Ratio Distribution by Team Rocket Membership')
plt.xlabel('Win Ratio')
plt.ylabel('Density')
plt.legend()
plt.tight_layout()
plt.show()
```

{{< codeoutput title="Pokemon Analysis Results" >}}
Mean Win Ratio - Team Rocket: 58.87, Non-Rocket: 52.08
![Pikachu Introduction](pokemon_files/03-04-pokemon_10_1.png)

{{< /codeoutput >}}

**Part B: Statistical Testing**

Now let's perform the statistical analysis to determine if there's a significant difference between the groups:

```python {open=true, lineNos=true}
# --- T-test for Mean Difference ---
# Perform an independent t-test. The 'equal_var=False' parameter
# performs a Welch's t-test, which is generally more robust.
ttest_result = ttest_ind(
    win_ratio_rocket,
    win_ratio_nonrocket,
    equal_var=False
)

print(f"T-test statistic: {ttest_result.statistic:.2f}")
print(f"p-value: {ttest_result.pvalue:.4f}")

if ttest_result.pvalue < 0.05:
    print("Result: 🏆 Significant difference in mean Win Ratio between Team Rocket and non-Team Rocket members.")
else:
    print("Result: 🧐 No significant difference in mean Win Ratio between groups.")
```

The second part performs a Welch's t-test (which doesn't assume equal variances) to statistically determine if the observed difference in mean win ratios is significant or just due to random chance.


{{< codeoutput title="Pokemon Analysis Results" >}}
T-test statistic: 9.24
p-value: 0.0000
Result: 🏆 Significant difference in mean Win Ratio between Team Rocket and non-Team Rocket members.
{{< /codeoutput >}}
















## What's Next?

In this post, we've tackled the first four questions of our investigation using parametric statistical analysis. In the upcoming posts, we'll continue our deep dive by exploring non-parametric features and more advanced analytical techniques to further unravel the mysteries of Team Rocket membership. Stay tuned!

All code examples are available in our [ML Odyssey repository](https://github.com/alvarolop/ml-odyssey).



