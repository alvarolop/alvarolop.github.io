---
title: "ML Odyssey: Part 3 - Statistical Methods for Exploratory Analysis"
date: 2025-08-20
draft: false
params:
  author: Álvaro López
tags: ["machine-learning", "statistics", "data-analysis", "eda", "statistical-testing"]
categories: ["ML Odyssey"]

description: "Master the statistical concepts behind effective exploratory data analysis and learn when and why to use different analytical techniques"
summary: "Deep dive into statistical testing, correlation analysis, spatial statistics, and advanced EDA theory to build solid analytical foundations for machine learning."

resources:
- name: "featured-image"
  src: "featured-image.png"
- name: featured-image-preview
  src: featured-image-preview.png
---

{{< admonition type=note title="Note" open=true >}}
This is Part 3 of our EDA series. If you haven't already, check out [Part 2](/2025/08/ml-odyssey-part-2-data-manipulation-visualization-with-python/) where we covered the programming fundamentals with pandas, matplotlib, and seaborn. Here we'll dive deep into the statistical concepts that power effective data analysis.
{{< /admonition >}}

Welcome to the analytical heart of exploratory data analysis! While [Part 2](/2025/08/ml-odyssey-part-2-data-manipulation-visualization-with-python/) taught you *how* to manipulate and visualize data, this post focuses on *why* and *when* to use different analytical techniques.

## The Statistical Foundation of EDA

Exploratory Data Analysis isn't just about creating pretty charts—it's about scientifically investigating your data to uncover reliable insights. Think of the tools we'll cover as your "data detective toolkit" that helps you prove whether patterns you observe are real discoveries or just coincidences.

<div style="background-color: #e7f3ff; border-left: 4px solid #0066cc; padding: 1em; margin: 20px 0;">

🎯 **The Core Question**: Every statistical test asks the same fundamental question: "Could this pattern have happened by random chance, or is there something real going on here?"

</div>

Before we dive into the details, here's the logical progression we'll follow to build your statistical analysis skills:

<div style="background-color: #f8f9fa; border: 2px solid #28a745; border-radius: 10px; padding: 20px; margin: 20px 0;">

**📚 The Complete EDA Learning Journey**

**Group 1: Analysis Methods**

1. **🔍 Test Selection by Data Type**: Choose tests based on what you're analyzing
   - 1.1 Categorical vs Categorical: Chi-Square vs Fisher's Exact
   - 1.2 Continuous vs Categorical - Two Groups: T-Test vs Mann-Whitney U
   - 1.3 Continuous vs Categorical - 3+ Groups: ANOVA vs Kruskal-Wallis
   - 1.4 Geographic Patterns: Moran's I Spatial Analysis
2. **🔧 Parametric vs Non-Parametric**: When to use each approach

**Group 2: Evaluation**

3. **📊 Relationships**: Testing relationships and understanding correlations  
X. **🎯 Complexity**: Reducing complexity with dimensionality reduction. **This is a very important topic and we will cover it in Part 6**.

**Group 3: Integration**

4. **🚀 Strategy**: Combining everything into a complete analytical strategy

**💡 Each section builds on the previous one, creating a systematic approach to data analysis!**

</div>

---

**🎯 Now that you understand the statistical foundation, let's learn how to choose the right tests for your data!**


## 1. 🔍 **Analysis Methods**: Test Selection by Data Type

**📚 Start here!** The first step in statistical analysis is understanding what you're testing and choosing the right method. Different data types require different approaches. Let's organize tests by the questions they answer rather than by complexity.

<div style="background-color: #f8f9fa; border: 2px solid #28a745; border-radius: 10px; padding: 20px; margin: 20px 0;">

**🎯 Statistical Test Decision Tree**

**Step 1: What are you testing?**
- **Categorical vs Categorical** → Chi-Square Test or Fisher's Exact Test
- **Continuous vs Categorical (2 groups)** → T-Test or Mann-Whitney U Test  
- **Continuous vs Categorical (3+ groups)** → ANOVA or Kruskal-Wallis Test
- **Geographic patterns** → Moran's I Spatial Analysis

**Step 2: How complex is your data?**
- **Normal data, large samples** → Parametric tests (more powerful)
- **Non-normal data, small samples** → Non-parametric tests (more robust)

</div>


### 1.1 Categorical vs Categorical: Testing Independence

**Question:** "Are these two categorical variables related or independent?"

| **Method** | **What It Does** | **Key Concepts** | **When to Use** |
|------------|------------------|------------------|-----------------|
| **Chi-Square Test** | Tests relationships between categorical variables to determine if they're independent or related | • **Null Hypothesis**: Variables are independent<br>• **Test Statistic**: Measures deviation from expected frequencies<br>• **Assumption**: Expected frequency ≥ 5 per cell<br>• **Effect Size**: Cramer's V (0-1, measures association strength) | • Large sample sizes<br>• All expected frequencies ≥ 5<br>• General independence testing |
| **Fisher's Exact Test** | Exact test for small categorical tables with no distribution assumptions | • **Null Hypothesis**: Variables are independent<br>• **Test Statistic**: Exact probability calculation<br>• **Assumption**: None (distribution-free)<br>• **Effect Size**: Phi coefficient or odds ratio | • Small sample sizes<br>• Expected frequencies < 5<br>• 2×2 contingency tables |

<div style="background-color: #f6f8fa; border-left: 4px solid #ffc107; padding: 1em; margin: 20px 0;">

**💡 Effect Size in Categorical Tests: What Do Cramer's V and Phi Mean?**

- <strong>Cramer's V (Chi-Square):</strong>  
  Cramer's V measures the strength of association between categorical variables. It ranges from 0 (no association) to 1 (perfect association), adjusted for the number of categories.  
  <strong>Interpretation:</strong>  
  <ul>
    <li>V > 0.1 = weak effect</li>
    <li>V > 0.3 = moderate effect</li>
    <li>V > 0.5 = strong effect</li>
  </ul>
  <em>Think of it as: "How much does knowing one variable help predict the other?"</em>

- <strong>Phi Coefficient (Fisher's Exact):</strong>  
  Phi coefficient measures association in 2×2 tables, similar to a correlation coefficient. It ranges from -1 to +1.  
  <strong>Interpretation:</strong>  
  <ul>
    <li>|φ| > 0.1 = weak effect</li>
    <li>|φ| > 0.3 = moderate effect</li>
    <li>|φ| > 0.5 = strong effect</li>
  </ul>
  <em>Think of it as: "How strongly are the two binary variables related?"</em>

</div>

#### 🔍 Interpreting Categorical Tests

**📊 Chi-Square Test Results:**
- **p-value < 0.05**: Variables are NOT independent (there's a real relationship)
- **p-value ≥ 0.05**: Variables are independent (no relationship detected)
- **Effect Size**: Cramer's V > 0.1 = weak, > 0.3 = moderate, > 0.5 = strong
- **Practical Insight**: "Pokemon type and Team Rocket membership are related (p < 0.01, V = 0.4), suggesting certain types are preferred by villains"

**🔬 Fisher's Exact Test Results:**
- **p-value < 0.05**: Variables are NOT independent (there's a real relationship)
- **p-value ≥ 0.05**: Variables are independent (no relationship detected)
- **Effect Size**: |φ| > 0.1 = weak, > 0.3 = moderate, > 0.5 = strong
- **Practical Insight**: "In small samples, Pokemon type and Team Rocket membership show moderate association (p < 0.05, φ = 0.35)"

### 1.2 Continuous vs Categorical - Two Groups: T-Test vs Mann-Whitney U

**Question:** "Do two groups have different average values?"

| **Method** | **What It Does** | **Key Concepts** | **When to Use** |
|------------|------------------|------------------|-----------------|
| **T-Test** | Compares means between exactly two groups | • **Paired vs. Independent**: Related vs. unrelated samples<br>• **T-Statistic**: Difference in means relative to standard error<br>• **Assumption**: Data approximately normal<br>• **Effect Size**: Cohen's d (standardized mean difference) | • Normal data distribution<br>• Large sample sizes<br>• Comparing two groups (e.g., before/after) |
| **Mann-Whitney U Test** | Non-parametric alternative to t-test using ranks | • **Rank Transformation**: Converts values to ranks<br>• **U-Statistic**: Measures separation between group rankings<br>• **Assumption**: None (distribution-free)<br>• **Effect Size**: r = Z/√N (0-1, strength of ranking differences) | • Non-normal data<br>• Small sample sizes<br>• Ordinal or continuous data with outliers |

<div style="background-color: #f6f8fa; border-left: 4px solid #ffc107; padding: 1em; margin: 20px 0;">

**💡 Effect Size in Two Groups Comparison: What Do Cohen's d and r Mean?**

- <strong>Cohen's d (T-Test):</strong>  
  Cohen's d measures the standardized difference between two group means. It's the difference in means divided by the pooled standard deviation.  
  <strong>Interpretation:</strong>  
  <ul>
    <li>d > 0.2 = small effect (groups overlap by 85%)</li>
    <li>d > 0.5 = medium effect (groups overlap by 67%)</li>
    <li>d > 0.8 = large effect (groups overlap by 53%)</li>
  </ul>
  <em>Think of it as: "How many standard deviations apart are the groups?"</em>

- <strong>r (Mann-Whitney U):</strong>  
  The r effect size is calculated as <code>r = Z/√N</code>, where Z is the standardized test statistic and N is the total sample size. It ranges from 0 to 1, similar to a correlation coefficient.  
  <strong>Interpretation:</strong>  
  <ul>
    <li>r > 0.1 = small effect</li>
    <li>r > 0.3 = medium effect</li>
    <li>r > 0.5 = large effect</li>
  </ul>
  <em>Think of it as: "How much do the group rankings differ from random chance?"</em>

</div>

#### 🔍 Interpreting Two Groups Comparison

**⚖️ T-Test Results:**
- **p-value < 0.05**: Groups are significantly different
- **t-statistic**: Higher absolute values indicate stronger differences
- **Effect Size**: Cohen's d > 0.2 = small, > 0.5 = medium, > 0.8 = large
- **Practical Insight**: "Team Rocket members have higher win ratios (t = 3.1, p < 0.01, d = 0.6), suggesting they're more skilled battlers"

**🔄 Mann-Whitney U Results:**
- **p-value < 0.05**: Groups differ significantly in rankings
- **Effect Size**: r = Z/√N, where r > 0.1 = small, > 0.3 = medium, > 0.5 = large
- **Practical Insight**: "Team Rocket migration patterns differ from regular trainers (U = 45, p < 0.05, r = 0.4), showing distinct movement strategies"

### 1.3 Continuous vs Categorical - 3+ Groups: ANOVA vs Kruskal-Wallis

**Question:** "Do multiple groups have different average values?"

| **Method** | **What It Does** | **Key Concepts** | **When to Use** |
|------------|------------------|------------------|-----------------|
| **ANOVA** | Compares means across multiple groups simultaneously | • **F-Statistic**: Ratio of between-group to within-group variance<br>• **Post-hoc Tests**: Identify which specific groups differ<br>• **Assumption**: Groups have similar variances<br>• **Effect Size**: Eta² (0-1, proportion of variance explained) | • Normal data distribution<br>• 3+ groups to compare<br>• Experimental design analysis |
| **Kruskal-Wallis Test** | Non-parametric alternative to ANOVA using ranks | • **H-Statistic**: Measures overall group differences using ranks<br>• **No Distribution Assumptions**: Works with any data shape<br>• **Post-hoc Analysis**: Dunn's test for pairwise comparisons<br>• **Effect Size**: Epsilon² (0-1, proportion of ranking variance explained) | • Non-normal data<br>• Multiple group comparisons<br>• Ordinal or continuous data |

<div style="background-color: #f6f8fa; border-left: 4px solid #ffc107; padding: 1em; margin: 20px 0;">

**💡 Effect Size in Multiple Groups Comparison: What Do Eta² and Epsilon² Mean?**

- <strong>Eta² (ANOVA):</strong>  
  Eta² measures the proportion of variance in the dependent variable explained by the independent variable. It ranges from 0 to 1.  
  <strong>Interpretation:</strong>  
  <ul>
    <li>0.01 = 1% variance explained (small effect)</li>
    <li>0.06 = 6% (medium effect)</li>
    <li>0.14 = 14% (large effect)</li>
  </ul>
  <em>Think of it as: "How much of the difference in attack stats is due to Pokemon type?"</em>

- <strong>Epsilon² (Kruskal-Wallis):</strong>  
  Epsilon² is the non-parametric equivalent of Eta², measuring the proportion of variance explained by group differences in rankings. It also ranges from 0 to 1.  
  <strong>Interpretation:</strong>  
  <ul>
    <li>0.01 = 1% variance explained (small effect)</li>
    <li>0.06 = 6% (medium effect)</li>
    <li>0.14 = 14% (large effect)</li>
  </ul>
  <em>Think of it as: "How much of the ranking differences are due to Pokemon type?"</em>

</div>

#### 🔍 Interpreting Multiple Groups Comparison

**📈 ANOVA Results:**
- **p-value < 0.05**: At least one group differs significantly
- **F-statistic**: Higher values indicate stronger group differences
- **Post-hoc needed**: Use Tukey's HSD to identify which specific groups differ
- **Effect Size**: Eta² > 0.01 = small, > 0.06 = medium, > 0.14 = large
- **Practical Insight**: "Pokemon types have different attack stats (F = 8.2, p < 0.001, η² = 0.15), with Fighting types being strongest"

**🎯 Kruskal-Wallis Results:**
- **p-value < 0.05**: At least one group differs in rankings
- **H-statistic**: Higher values indicate stronger group differences
- **Post-hoc needed**: Use Dunn's test for pairwise comparisons
- **Effect Size**: Epsilon² > 0.01 = small, > 0.06 = medium, > 0.14 = large
- **Practical Insight**: "Pokemon types have different strength rankings (H = 12.3, p < 0.01, ε² = 0.18), with Dragon types ranking highest"

### 1.3 Geographic Patterns: Spatial Analysis

**Question:** "Are there geographic patterns or clusters in your data?"

| **Method** | **What It Does** | **Key Concepts** | **When to Use** |
|------------|------------------|------------------|-----------------|
| **Moran's I** | Tests for spatial autocorrelation to detect geographic clustering patterns | • **Spatial Autocorrelation**: Measures if similar values cluster geographically<br>• **I-Statistic**: Ranges from -1 (dispersed) to +1 (clustered)<br>• **Spatial Weights**: Defines what "nearby" means in your context<br>• **Effect Size**: |I| > 0.1 = weak, > 0.3 = moderate, > 0.5 = strong | • Geographic data with coordinates<br>• Detecting hotspots or clusters<br>• Understanding spatial patterns in phenomena |

<div style="background-color: #f6f8fa; border-left: 4px solid #ffc107; padding: 1em; margin: 20px 0;">

**💡 Effect Size in Spatial Analysis: What Does Moran's I Mean?**

- <strong>Moran's I (Spatial Autocorrelation):</strong>  
  Moran's I measures spatial autocorrelation - how much similar values tend to cluster geographically. It ranges from -1 (perfect dispersion) to +1 (perfect clustering), with 0 indicating random distribution.  
  <strong>Interpretation:</strong>  
  <ul>
    <li>|I| > 0.1 = weak spatial pattern</li>
    <li>|I| > 0.3 = moderate spatial pattern</li>
    <li>|I| > 0.5 = strong spatial pattern</li>
  </ul>
  <em>Think of it as: "How much do similar values (like Team Rocket members) tend to be located near each other?"</em>

- <strong>Direction Matters:</strong>  
  <ul>
    <li><strong>I > 0:</strong> Positive spatial autocorrelation (similar values cluster together)</li>
    <li><strong>I < 0:</strong> Negative spatial autocorrelation (similar values are dispersed)</li>
    <li><strong>I ≈ 0:</strong> No spatial pattern (random distribution)</li>
  </ul>

</div>

#### 🔍 Interpreting Spatial Analysis

**🗺️ Moran's I Results:**
- **I > 0**: Positive spatial autocorrelation (similar values cluster together)
- **I < 0**: Negative spatial autocorrelation (similar values are dispersed)
- **I ≈ 0**: No spatial pattern (random distribution)
- **p-value < 0.05**: Spatial pattern is statistically significant
- **Effect Size**: |I| > 0.1 = weak, > 0.3 = moderate, > 0.5 = strong
- **Practical Insight**: "Team Rocket members show strong clustering (I = 0.45, p < 0.001), indicating they operate in specific geographic regions"

---

## 2. 🔧 **Analysis Methods**: Parametric vs Non-Parametric Decision

Now that you know which test type to use, let's understand when to choose the parametric or non-parametric version of each test.

<div style="background-color: #e7f3ff; border-left: 4px solid #0066cc; padding: 1em; margin: 20px 0;">

🎯 **Key Concept**: Parametric tests are more powerful when assumptions are met, but non-parametric tests are more robust when data is messy. Always check your data before choosing!

</div>

<div style="display: flex; gap: 2em; flex-wrap: wrap; margin-bottom: 2em;">

  <div style="flex: 1 1 300px; min-width: 260px; background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.2em;">
    <h4 style="margin-top:0;">Parametric Tests</h4>
    <strong>✅ Use when:</strong>
    <ul>
      <li><b>Data is approximately normal</b> (bell curve shape)</li>
      <li><b>Sample sizes are large</b> (n &gt; 30)</li>
      <li><b>Groups have similar variances</b> (homogeneity)</li>
      <li><b>Data is continuous</b> and well-behaved</li>
    </ul>
    <strong>🎯 Benefits:</strong>
    <ul>
      <li><b>More statistical power</b> (better chance of detecting real effects)</li>
      <li><b>Exact p-values</b> from known distributions</li>
      <li><b>Standard effect size measures</b> (Cohen's d, Eta²)</li>
      <li><b>Widely understood</b> and reported in literature</li>
    </ul>
    <strong>⚠️ Risks:</strong>
    <ul>
      <li><b>Results can be misleading</b> if assumptions are violated</li>
      <li><b>Type I/II errors</b> increase with assumption violations</li>
      <li><b>May need data transformation</b> to meet assumptions</li>
    </ul>
  </div>

  <div style="flex: 1 1 300px; min-width: 260px; background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.2em;">
    <h4 style="margin-top:0;">Non-Parametric Tests</h4>
    <strong>✅ Use when:</strong>
    <ul>
      <li><b>Data is not normally distributed</b> (skewed, irregular)</li>
      <li><b>Sample sizes are small</b> (n &lt; 30)</li>
      <li><b>Data has outliers</b> that can't be removed</li>
      <li><b>Data is ordinal</b> (rankings, ratings)</li>
      <li><b>Variances are unequal</b> between groups</li>
    </ul>
    <strong>🎯 Benefits:</strong>
    <ul>
      <li><b>No distribution assumptions</b> required</li>
      <li><b>Robust against outliers</b> and extreme values</li>
      <li><b>Works with any data shape</b> or size</li>
      <li><b>More reliable</b> when parametric assumptions fail</li>
    </ul>
    <strong>⚠️ Trade-offs:</strong>
    <ul>
      <li><b>Slightly less powerful</b> than parametric tests</li>
      <li><b>May need larger samples</b> to detect the same effect</li>
      <li><b>Effect sizes</b> are less standardized</li>
      <li><b>Results</b> are rank-based, not value-based</li>
    </ul>
  </div>

</div>

<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 1em; margin: 20px 0;">

**💡 Recommended Approach:**

1. **Start with parametric tests** (more powerful when assumptions are met)
2. **Check assumptions** (normality, homogeneity, sample size)
3. **If assumptions fail**, switch to non-parametric alternatives
4. **Report both results** if possible (parametric + non-parametric)

</div>





<div style="background-color: #e8f5e8; border: 2px solid #4caf50; border-radius: 10px; padding: 20px; margin: 20px 0;">

**🔍 Real-World Application: Pokemon Team Rocket Dataset Analysis**

In Part 4, you'll use every single statistical method from Section 1 to analyze real Pokemon data. Here's exactly what you'll investigate:

**📊 Categorical vs Categorical (Section 1.1)**
- **Chi-Square/Fisher's Exact**: "Are Pokemon types independent of Team Rocket membership?" 
  - *You'll choose between Chi-Square (large samples) and Fisher's Exact (small samples)*

**📈 Two Groups Comparison (Section 1.2)**
- **T-Test vs Mann-Whitney U**: "Do Team Rocket members have higher attack stats?"
  - *You'll choose based on data normality and sample size*

**📊 Multiple Groups Comparison (Section 1.3)**
- **ANOVA vs Kruskal-Wallis**: "Do different Pokemon types have different average attack stats?"
  - *You'll compare multiple types and choose the appropriate test*

**🗺️ Geographic Patterns (Section 1.4)**
- **Moran's I**: "Are Team Rocket members geographically clustered?"
  - *You'll analyze location data to find spatial patterns*

**🔧 Test Selection Strategy (Section 2)**
- **Parametric vs Non-Parametric**: You'll learn when to use each approach based on your data characteristics

**💡 The Connection**: Every concept you just learned will be applied to real data, helping you understand not just the theory, but how to use these methods in practice!

</div>

---

**🎯 TRANSITION: From Analysis Methods to Evaluation Criteria**

<div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 1em; margin: 20px 0;">

**📚 What You've Learned So Far (Group 1: ANALYSIS METHODS):**
- ✅ **Section 1**: How to choose tests based on data type (categorical, continuous, geographic)
  - 1.1 Categorical independence testing (Chi-Square vs Fisher's Exact)
  - 1.2 Two groups comparison (T-Test vs Mann-Whitney U)
  - 1.3 Multiple groups comparison (ANOVA vs Kruskal-Wallis)
  - 1.4 Geographic patterns (Moran's I)
- ✅ **Section 2**: When to use parametric vs non-parametric approaches

**🔍 What's Coming Next (Group 2: EVALUATION):**
- 📊 **Section 4**: How to evaluate relationships between variables
- 🎯 **Section 5**: How to simplify complex, high-dimensional data
- 📏 **Section 6**: How to measure the practical importance of your findings

</div>

---

**📊 Now let's understand how to analyze relationships between variables and evaluate if our analysis was useful!**



## 3. 📊 **Evaluation**: Correlation vs Causation: The Data Science Golden Rule

Understanding relationships between variables is crucial, but there's a big difference between correlation and causation!

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
    <div style="background-color: #e8f5e8; border: 2px solid #4caf50; border-radius: 10px; padding: 20px;">
        <h4 style="margin-top: 0; color: #2e7d32;">✅ Correlation</h4>
        <p style="margin: 10px 0; font-size: 0.9rem;"><strong>What it is:</strong> Two things tend to change together</p>
        <p style="margin: 10px 0; font-size: 0.9rem;"><strong>Example:</strong> Ice cream sales and drowning deaths both increase in summer</p>
        <p style="margin: 10px 0; font-size: 0.9rem;"><strong>Measurement:</strong> Correlation coefficient (-1 to +1)</p>
    </div>
    <div style="background-color: #fff3e0; border: 2px solid #ff9800; border-radius: 10px; padding: 20px;">
        <h4 style="margin-top: 0; color: #f57c00;">⚠️ Causation</h4>
        <p style="margin: 10px 0; font-size: 0.9rem;"><strong>What it is:</strong> One thing directly causes another</p>
        <p style="margin: 10px 0; font-size: 0.9rem;"><strong>Reality:</strong> Hot weather causes both (confounding variable!)</p>
        <p style="margin: 10px 0; font-size: 0.9rem;"><strong>Proof needed:</strong> Controlled experiments or strong theory</p>
    </div>
</div>

Understanding relationships between variables is crucial, but there's a big difference between correlation and causation! Here are the key types of correlation you need to know:

| Correlation Type | When to Use | What It Measures |
|------------------|-------------|------------------|
| **Pearson** | Linear relationships, normal data | Straight-line relationships |
| **Spearman** | Non-linear relationships, ordinal data | Monotonic relationships (consistently increasing/decreasing) |

---

**🎯 Practice Preview: Correlation Analysis in Part 4**

<div style="background-color: #fff3e0; border: 2px solid #ff9800; border-radius: 10px; padding: 20px; margin: 20px 0;">

**🔗 Real-World Correlation Analysis**

In Part 4, you'll apply these correlation concepts to discover relationships in Pokemon data:

- **Pearson Correlation**: "How strongly do Pokemon attack and defense stats correlate?"
  - *You'll calculate r values and interpret the strength of linear relationships*
- **Spearman Correlation**: "Do Pokemon types have consistent strength rankings?"
  - *You'll test for monotonic relationships when data isn't linear*
- **Correlation vs Causation**: "Does high attack cause high defense, or are they both influenced by Pokemon level?"
  - *You'll identify confounding variables and avoid causal misinterpretations*

**💡 The Connection**: Understanding correlation types helps you choose the right analysis method and interpret results correctly!

</div>






**🎯 Now let's learn how to simplify complex, high-dimensional data!**



## 4. 🚀 Putting It All Together: Your Complete EDA Strategy

Now you have all the analytical tools! Here's how they work together in a systematic analysis:

<div style="background-color: #f8f9fa; border: 2px solid #28a745; border-radius: 10px; padding: 20px; margin: 20px 0;">

### 6.1 The Complete EDA Journey with Analytical Tools

1. **🔍 Data Understanding**
   - Classify variables by type (numerical, categorical, datetime)
   - Understand the statistical properties of each variable

2. **🧹 Preprocessing Strategy** 
   - Choose appropriate encoding based on variable type
   - Apply statistical feature selection (ANOVA, Chi-square)
   - Consider the implications for downstream analysis

3. **📊 Statistical Hypothesis Testing**
   - Select appropriate tests from our complete toolkit (Chi-square, ANOVA, T-test, Mann-Whitney U, Kruskal-Wallis, Moran's I)
   - Always check both significance AND effect size
   - Use tests to validate patterns found in visualizations

4. **📈 Advanced Pattern Recognition**
   - Use correlation analysis to understand relationships
   - Apply visualization theory to reveal hidden patterns
   - Distinguish between correlation and causation

5. **🗺️ Geographic Analysis** (when location data exists)
   - Apply Moran's I for spatial autocorrelation testing
   - Identify geographic clusters and patterns
   - Integrate spatial insights with other statistical findings

6. **🎯 Dimensionality Strategy**
   - Apply PCA for complex, high-dimensional datasets
   - Compare PCA components with statistical feature importance
   - Understand explained variance and information retention

7. **🔬 Scientific Validation**
   - Interpret results in context of domain knowledge
   - Consider practical significance (effect size), not just statistical significance
   - Build a coherent analytical narrative supported by evidence

</div>

## What's Next?

Now that you understand both the programming tools (from Part 2) and the analytical concepts (from this Part 3), you're ready for the exciting practical application!

In **Part 4**, we'll combine everything:
1. Apply pandas programming skills to real Pokemon data
2. Use statistical tests to validate patterns we discover  
3. Evaluate the practical usefulness of each finding
4. Create advanced visualizations guided by theory
5. Build a complete analytical narrative that guides ML decisions

<div style="background-color: #f6f8fa; border-left: 4px solid #26e3ddff; padding: 1em; margin-bottom: 1em;">

🎯 **Ready for the Real Challenge?**: You now have both the programming skills AND the analytical foundation to tackle the Pokemon Team Rocket dataset in Part 4. We'll use every single tool and concept covered in Parts 2 and 3 to uncover hidden patterns and build insights that matter!

All theoretical concepts and practical implementations are available in our [ML Odyssey repository](https://github.com/alvarolop/ml-odyssey).

</div> 