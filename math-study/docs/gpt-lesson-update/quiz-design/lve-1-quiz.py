import json, math, textwrap, os
from pathlib import Path
def q(id,difficulty,stem,choices,answer,explanation,tags):
    assert 0 <= answer < len(choices)
    return {"id":id,"difficulty":difficulty,"stem":stem,"choices":choices,"answer":answer,"explanation":explanation,"tags":tags}
quizzes=[]

# helper add quiz
def add_quiz(quizId,title,topicId,quizType,questions,time=None):
    quizzes.append({"quizId":quizId,"title":title,"topicId":topicId,"quizType":quizType,"questionCount":len(questions),"questions":questions})

# Build all quizzes
# PEMDAS mastery
pem_m = [
q("pem-m-01","easy","Evaluate: 6 + 3 × 4",["36","18","24","15"],1,"Multiply first: 3 × 4 = 12, then 6 + 12 = 18.",["multiply-before-add"]),
q("pem-m-02","easy","Evaluate: (8 + 2) × 3",["14","24","30","18"],2,"Parentheses first: 8 + 2 = 10, then 10 × 3 = 30.",["parentheses"]),
q("pem-m-03","easy","Evaluate: 20 − 12 ÷ 3",["8","16","4","12"],1,"Divide first: 12 ÷ 3 = 4, then 20 − 4 = 16.",["divide-before-subtract"]),
q("pem-m-04","easy","Evaluate: 2^3 + 5",["11","13","9","15"],1,"Exponent first: 2^3 = 8, then 8 + 5 = 13.",["exponents"]),
q("pem-m-05","easy","Evaluate: 18 ÷ 3 × 2",["3","6","12","9"],2,"Multiply/divide left to right: 18 ÷ 3 = 6, then 6 × 2 = 12.",["left-to-right"]),
q("pem-m-06","medium","Evaluate: 14 − 2 × (3 + 4)",["0","2","12","-2"],0,"Parentheses: 3 + 4 = 7. Multiply: 2 × 7 = 14. Then 14 − 14 = 0.",["parentheses","multiply-before-subtract"]),
q("pem-m-07","medium","Evaluate: 36 ÷ (6 − 3) + 5",["17","12","9","15"],0,"Parentheses: 6 − 3 = 3. Then 36 ÷ 3 = 12. Then 12 + 5 = 17.",["parentheses","division"]),
q("pem-m-08","medium","Evaluate: 4 + 18 ÷ 6 × 5",["19","34","9","15"],0,"Division and multiplication left to right: 18 ÷ 6 = 3, 3 × 5 = 15, then 4 + 15 = 19.",["left-to-right"]),
q("pem-m-09","medium","Evaluate: 7 + 2 × 3^2",["81","25","43","18"],1,"Exponent: 3^2 = 9. Multiply: 2 × 9 = 18. Add: 7 + 18 = 25.",["exponents"]),
q("pem-m-10","medium","Evaluate: (15 − 5) ÷ 2 + 9",["14","10","7","19"],0,"Parentheses: 15 − 5 = 10. Divide: 10 ÷ 2 = 5. Add: 5 + 9 = 14.",["parentheses"]),
q("pem-m-11","medium","A student solves 5 + 4 × 2 as (5 + 4) × 2. What is the correct value of the original expression?",["18","13","9","16"],1,"Correct order: 4 × 2 = 8, then 5 + 8 = 13.",["trap"]),
q("pem-m-12","hard","Evaluate: 24 ÷ 3 + 2 × (5 − 1)^2",["40","24","18","28"],0,"Parentheses: 5 − 1 = 4. Exponent: 4^2 = 16. Multiply: 2 × 16 = 32. Division: 24 ÷ 3 = 8. Add: 8 + 32 = 40.",["multi-step"]),
q("pem-m-13","hard","Evaluate: 50 − [6 + 2 × (4^2 − 10)]",["18","20","32","24"],2,"4^2 = 16. 16 − 10 = 6. 2 × 6 = 12. Bracket: 6 + 12 = 18. Then 50 − 18 = 32.",["multi-step"]),
q("pem-m-14","hard","Evaluate: 3 × {8 − [6 − (4 − 1)]}",["3","9","15","21"],2,"(4 − 1)=3; [6 − 3]=3; {8 − 3}=5; 3 × 5 = 15.",["nested-parentheses"]),
q("pem-m-15","expert","Which expression has the same value as 18 − 6 ÷ 3 × 2 + 4?",["(18 − 6) ÷ 3 × 2 + 4","18 − [(6 ÷ 3) × 2] + 4","18 − [6 ÷ (3 × 2)] + 4","(18 − 6) ÷ (3 × 2) + 4"],1,"Compute division and multiplication left to right inside the middle term. Equivalent form is 18 − [(6 ÷ 3) × 2] + 4.",["equivalent-expression"])
]
add_quiz("pemdas-mastery","PEMDAS Mastery Quiz","pemdas","mastery",pem_m)

pem_s = [
q("pem-s-01","easy","Evaluate: 9 + 2 × 5",["55","19","35","45"],1,"2 × 5 = 10; 9 + 10 = 19.",["speed"]),
q("pem-s-02","easy","Evaluate: (7 + 1) × 2",["9","14","16","8"],2,"7 + 1 = 8; 8 × 2 = 16.",["speed"]),
q("pem-s-03","easy","Evaluate: 16 ÷ 4 + 3",["7","1","4","19"],0,"16 ÷ 4 = 4; 4 + 3 = 7.",["speed"]),
q("pem-s-04","easy","Evaluate: 5^2 − 10",["15","20","10","5"],0,"5^2 = 25; 25 − 10 = 15.",["speed"]),
q("pem-s-05","medium","Evaluate: 12 − 3 × 2",["18","6","3","0"],1,"3 × 2 = 6; 12 − 6 = 6.",["speed"]),
q("pem-s-06","medium","Evaluate: 8 + 24 ÷ 6",["12","32","4","20"],0,"24 ÷ 6 = 4; 8 + 4 = 12.",["speed"]),
q("pem-s-07","medium","Evaluate: (10 − 4) ÷ 3",["3","2","6","4"],1,"10 − 4 = 6; 6 ÷ 3 = 2.",["speed"]),
q("pem-s-08","medium","Evaluate: 2 × 3 + 4",["14","10","12","16"],1,"2 × 3 = 6; 6 + 4 = 10.",["speed"]),
q("pem-s-09","medium","Evaluate: 30 ÷ 5 × 2",["3","12","6","10"],1,"30 ÷ 5 = 6; 6 × 2 = 12.",["speed"]),
q("pem-s-10","medium","Evaluate: 4 + (6 − 2)^2",["20","8","16","10"],0,"6 − 2 = 4; 4^2 = 16; 16 + 4 = 20.",["speed"])
]
add_quiz("pemdas-speed","PEMDAS Speed Drill","pemdas","speed",pem_s)

# Decimals
dec_m = [
q("dec-m-01","easy","Compute: 2.5 × 0.4",["10","1","0.1","100"],1,"25 × 4 = 100, then place 2 decimal places total: 1.00.",["decimal-multiply"]),
q("dec-m-02","easy","Compute: 1.2 × 3.5",["42","4.2","0.42","420"],1,"12 × 35 = 420, then 2 decimal places total gives 4.20.",["decimal-multiply"]),
q("dec-m-03","easy","Compute: 7.5 + 2.08",["9.58","9.48","8.33","10.03"],0,"Align decimals and add.",["decimal-add"]),
q("dec-m-04","easy","Compute: 9.4 − 3.27",["6.13","6.23","5.17","6.03"],0,"Line up decimals: 9.40 − 3.27 = 6.13.",["decimal-subtract"]),
q("dec-m-05","easy","Compute: 0.06 × 0.5",["0.30","0.03","0.003","3"],1,"6 × 5 = 30; total 3 decimal places gives 0.030 = 0.03.",["decimal-multiply"]),
q("dec-m-06","medium","Compute: 3.6 ÷ 0.4",["0.9","9","90","1.1"],1,"Move both decimals one place: 36 ÷ 4 = 9.",["decimal-divide"]),
q("dec-m-07","medium","Compute: 12.6 ÷ 0.3",["4.2","42","0.42","420"],1,"Move decimals one place: 126 ÷ 3 = 42.",["decimal-divide"]),
q("dec-m-08","medium","A notebook costs $1.25. What is the cost of 6 notebooks?",["$6.50","$7.25","$7.50","$8.25"],2,"1.25 × 6 = 7.50.",["money"]),
q("dec-m-09","medium","Estimate first, then compute: 4.9 × 2.1 is closest to",["1","5","10","20"],2,"About 5 × 2 = 10, and exact answer 10.29 is closest to 10.",["estimate"]),
q("dec-m-10","medium","Compute: 0.75 ÷ 0.25",["0.3","3","30","0.03"],1,"75 hundredths ÷ 25 hundredths = 3.",["decimal-divide"]),
q("dec-m-11","medium","Which is greater?",["0.8 × 0.4","0.32","They are equal","Cannot determine"],2,"0.8 × 0.4 = 0.32.",["comparison"]),
q("dec-m-12","hard","A worker earns $18.75 per hour. How much does the worker earn in 8 hours?",["$140.00","$150.00","$152.00","$156.25"],1,"18.75 × 8 = 150.00.",["money","multi-step"]),
q("dec-m-13","hard","A rope 12.5 feet long is cut into pieces of 0.5 foot each. How many pieces are made?",["6","12","25","30"],2,"12.5 ÷ 0.5 = 25.",["decimal-divide","word-problem"]),
q("dec-m-14","hard","Compute: (2.4 × 0.5) + 1.08",["2.28","2.88","1.68","1.20"],0,"2.4 × 0.5 = 1.2, then 1.2 + 1.08 = 2.28.",["multi-step"]),
q("dec-m-15","expert","A store marks a $48 item down by 12.5%. What is the sale price?",["$42.00","$40.50","$36.00","$44.25"],0,"12.5% is 1/8. One-eighth of 48 is 6. Sale price = 48 − 6 = 42.",["money","percent-anchor"])
]
add_quiz("decimals-mastery","Decimal Operations Mastery Quiz","decimals","mastery",dec_m)

dec_s = [
q("dec-s-01","easy","Compute: 0.5 × 0.2",["0.01","0.1","1","10"],1,"5 × 2 = 10, two decimal places gives 0.10.",["speed"]),
q("dec-s-02","easy","Compute: 4.2 ÷ 0.6",["7","0.7","70","6"],0,"42 ÷ 6 = 7.",["speed"]),
q("dec-s-03","easy","Compute: 1.5 + 2.5",["3","4","5","6"],1,"1.5 + 2.5 = 4.0.",["speed"]),
q("dec-s-04","easy","Compute: 6.4 − 1.1",["5.3","5.5","4.3","7.5"],0,"6.4 − 1.1 = 5.3.",["speed"]),
q("dec-s-05","medium","Compute: 0.9 × 0.3",["0.27","0.03","2.7","0.9"],0,"9 × 3 = 27, two decimal places gives 0.27.",["speed"]),
q("dec-s-06","medium","Compute: 2.4 ÷ 0.8",["0.3","3","30","2"],1,"24 ÷ 8 = 3.",["speed"]),
q("dec-s-07","medium","Compute: $2.50 × 4",["$8.00","$10.00","$12.00","$6.00"],1,"2.5 × 4 = 10.",["speed","money"]),
q("dec-s-08","medium","Which is closest to 3.1 × 2.9?",["3","6","9","12"],2,"About 3 × 3 = 9; exact is 8.99.",["speed","estimate"]),
q("dec-s-09","medium","Compute: 0.84 ÷ 0.2",["4.2","0.42","42","2.4"],0,"84 ÷ 2 = 42, then one decimal place => 4.2.",["speed"]),
q("dec-s-10","medium","Compute: 0.25 × 16",["2","4","6","8"],1,"A quarter of 16 is 4.",["speed","money-anchor"])
]
add_quiz("decimals-speed","Decimal Operations Speed Drill","decimals","speed",dec_s)

# Fractions
fra_m = [
q("fra-m-01","easy","What is 3/4 of 24?",["16","18","20","21"],1,"24 × 3/4 = 18.",["fraction-of-number"]),
q("fra-m-02","easy","Compute: 1/2 + 1/4",["3/4","2/6","1/6","1/8"],0,"Convert 1/2 to 2/4; 2/4 + 1/4 = 3/4.",["common-denominator"]),
q("fra-m-03","easy","Compute: 2/3 × 9",["3","6","9","12"],1,"2/3 of 9 = 6.",["fraction-of-number"]),
q("fra-m-04","easy","Simplify: 18/24",["2/3","3/4","4/5","6/8"],1,"Divide numerator and denominator by 6.",["simplify"]),
q("fra-m-05","easy","Compute: 5/6 − 1/3",["1/2","2/3","4/3","1/3"],0,"1/3 = 2/6; 5/6 − 2/6 = 3/6 = 1/2.",["common-denominator"]),
q("fra-m-06","medium","Compute: 3/5 ÷ 1/2",["3/10","5/6","6/5","3/7"],2,"Multiply by reciprocal: 3/5 × 2/1 = 6/5.",["reciprocal-division"]),
q("fra-m-07","medium","A recipe uses 1/3 cup of sugar per batch. How many batches can be made from 4 cups?",["7","9","12","16"],2,"4 ÷ 1/3 = 4 × 3 = 12.",["word-problem","reciprocal-division"]),
q("fra-m-08","medium","What fraction of 40 is 10?",["1/2","1/3","1/4","2/5"],2,"10/40 = 1/4.",["part-whole"]),
q("fra-m-09","medium","Compute: 2/7 + 3/7",["5/14","5/7","6/7","1"],1,"Same denominator: add numerators.",["common-denominator"]),
q("fra-m-10","medium","If 2/5 of a number is 18, what is the number?",["36","40","45","50"],2,"x × 2/5 = 18, so x = 18 × 5/2 = 45.",["inverse-fraction"]),
q("fra-m-11","medium","A tank is 3/4 full. If 1/6 of the tank is used, what fraction of the tank remains?",["7/12","1/2","5/8","2/3"],0,"3/4 = 9/12 and 1/6 = 2/12, so 9/12 − 2/12 = 7/12.",["common-denominator","word-problem"]),
q("fra-m-12","hard","If 600 is one-fifth more than x, what is x?",["480","500","520","720"],1,"One-fifth more means 6/5 of x. So 600 = 6x/5; x = 600 × 5/6 = 500.",["fraction-relationship"]),
q("fra-m-13","hard","One number is 3/5 of another. If their sum is 64, what are the numbers?",["24 and 40","20 and 44","18 and 46","16 and 48"],0,"Let larger be 5k and smaller be 3k. Sum 8k = 64, so k = 8. Numbers are 24 and 40.",["ratio-fraction"]),
q("fra-m-14","hard","Compute: (3/4) ÷ (9/8)",["2/3","3/2","27/32","1/6"],0,"Multiply by reciprocal: 3/4 × 8/9 = 24/36 = 2/3.",["reciprocal-division"]),
q("fra-m-15","expert","A worker completes 2/3 of a job in 4 hours at a steady rate. How much of the job is completed in 1 hour?",["1/6","1/4","2/3","3/8"],0,"Per hour rate is (2/3) ÷ 4 = 2/12 = 1/6 of the job.",["fraction-rate"])
]
add_quiz("fractions-mastery","Fractions Mastery Quiz","fractions","mastery",fra_m)

fra_s = [
q("fra-s-01","easy","What is 1/2 of 18?",["6","8","9","12"],2,"Half of 18 is 9.",["speed"]),
q("fra-s-02","easy","Compute: 1/4 + 1/4",["1/2","1/4","2/8","3/4"],0,"1/4 + 1/4 = 2/4 = 1/2.",["speed"]),
q("fra-s-03","easy","Simplify: 6/9",["1/2","2/3","3/4","4/5"],1,"Divide by 3.",["speed"]),
q("fra-s-04","easy","Compute: 3/5 of 20",["10","12","15","8"],1,"20 × 3/5 = 12.",["speed"]),
q("fra-s-05","medium","Compute: 1/2 ÷ 1/4",["1","2","3","4"],1,"Multiply by reciprocal: 1/2 × 4 = 2.",["speed"]),
q("fra-s-06","medium","Compute: 2/3 + 1/6",["5/6","3/9","1/2","4/9"],0,"2/3 = 4/6; 4/6 + 1/6 = 5/6.",["speed"]),
q("fra-s-07","medium","Compute: 3/4 − 1/2",["1/2","1/4","1/3","2/5"],1,"1/2 = 2/4; 3/4 − 2/4 = 1/4.",["speed"]),
q("fra-s-08","medium","What fraction of 30 is 6?",["1/2","1/4","1/5","1/6"],2,"6/30 = 1/5.",["speed"]),
q("fra-s-09","medium","Compute: 2/7 × 14",["2","4","6","7"],1,"14 × 2/7 = 4.",["speed"]),
q("fra-s-10","medium","Compute: 5/8 ÷ 5",["1/8","1/5","5/3","8/5"],0,"5/8 × 1/5 = 1/8.",["speed"])
]
add_quiz("fractions-speed","Fractions Speed Drill","fractions","speed",fra_s)

# Percents
per_m = [
q("per-m-01","easy","What is 20% of 150?",["15","20","30","45"],2,"20% = 0.20. Then 0.20 × 150 = 30.",["percent-of-number"]),
q("per-m-02","easy","A shirt costs $40 and is 25% off. What is the sale price?",["$25","$28","$30","$35"],2,"25% off means pay 75%. 40 × 0.75 = 30.",["discount"]),
q("per-m-03","easy","18 out of 24 students passed. What percent passed?",["65%","70%","75%","80%"],2,"18 ÷ 24 = 0.75 = 75%.",["percent-of-total"]),
q("per-m-04","easy","What is 50% of 84?",["21","42","48","64"],1,"50% means half. Half of 84 is 42.",["percent-anchor"]),
q("per-m-05","easy","What is 10% of 360?",["3.6","36","30","18"],1,"Move decimal one place left: 36.",["percent-anchor"]),
q("per-m-06","medium","A $60 item has 8% sales tax. What is the total cost?",["$64.80","$64.00","$68.00","$65.20"],0,"Tax is 0.08 × 60 = 4.80. Total is 64.80.",["tax"]),
q("per-m-07","medium","A meal costs $32. A 15% tip is left. How much is the tip?",["$3.20","$4.80","$5.20","$6.40"],1,"10% is 3.20 and 5% is 1.60, so 15% is 4.80.",["tip","percent-anchor"]),
q("per-m-08","medium","A population grows from 200 to 250. What is the percent increase?",["20%","25%","30%","50%"],1,"Increase is 50. 50 ÷ 200 = 0.25 = 25%.",["percent-change"]),
q("per-m-09","medium","What percent of 80 is 12?",["10%","12%","15%","18%"],2,"12 ÷ 80 = 0.15 = 15%.",["percent-of-total"]),
q("per-m-10","medium","A store offers 20% off a $90 jacket. What is the discount amount?",["$18","$20","$22.50","$72"],0,"0.20 × 90 = 18.",["discount"]),
q("per-m-11","medium","A number decreases from 50 to 40. What is the percent decrease?",["10%","20%","25%","40%"],1,"Decrease is 10. 10 ÷ 50 = 20%.",["percent-change"]),
q("per-m-12","hard","After a 20% discount, a bike costs $160. What was the original price?",["$180","$192","$200","$220"],2,"After 20% off, price is 80% of original. Original = 160 ÷ 0.80 = 200.",["reverse-percent"]),
q("per-m-13","hard","A worker's pay increases from $18 to $21.60 per hour. What is the percent increase?",["15%","18%","20%","25%"],2,"Increase is 3.60. 3.60 ÷ 18 = 0.20 = 20%.",["percent-change"]),
q("per-m-14","hard","A $80 item is discounted 25% and then another 10%. What is the final price?",["$52","$54","$56","$60"],1,"80 × 0.75 = 60; then 60 × 0.90 = 54.",["successive-discounts"]),
q("per-m-15","expert","A town's population drops 10% one year and then rises 10% the next. Compared with the original population, the final population is",["the same","1% lower","1% higher","10% lower"],1,"Start with 100. Drop to 90, then rise to 99. Final is 1% lower.",["trap","successive-percent"])
]
add_quiz("percents-mastery","Percents Mastery Quiz","percents","mastery",per_m)

per_s = [
q("per-s-01","easy","What is 10% of 90?",["9","19","0.9","90"],0,"10% is move decimal one place left.",["speed"]),
q("per-s-02","easy","What is 25% of 60?",["20","15","12","10"],1,"25% is one-fourth. 60 ÷ 4 = 15.",["speed","anchor"]),
q("per-s-03","easy","What is 50% of 26?",["26","13","12","6"],1,"Half of 26 is 13.",["speed","anchor"]),
q("per-s-04","easy","What is 5% of 80?",["2","4","5","8"],1,"5% is half of 10%; 10% of 80 is 8, so 5% is 4.",["speed","anchor"]),
q("per-s-05","medium","15% of 40 is",["4","5","6","8"],2,"10% is 4 and 5% is 2, total 6.",["speed"]),
q("per-s-06","medium","$50 with 20% off costs",["$10","$30","$40","$45"],2,"Pay 80% of 50 = 40.",["speed"]),
q("per-s-07","medium","12 is what percent of 60?",["10%","15%","20%","25%"],2,"12 ÷ 60 = 0.20.",["speed"]),
q("per-s-08","medium","A price rises from $30 to $36. Percent increase?",["10%","20%","25%","30%"],1,"Increase is 6; 6/30 = 20%.",["speed"]),
q("per-s-09","medium","A $40 meal with 10% tip has total",["$42","$43","$44","$46"],2,"Tip = 4, total = 44.",["speed"]),
q("per-s-10","medium","30% of 70 is",["18","19","21","24"],2,"0.30 × 70 = 21.",["speed"])
]
add_quiz("percents-speed","Percents Speed Drill","percents","speed",per_s)

# Unit conversion
uni_m = [
q("uni-m-01","easy","Convert 7 gallons to quarts.",["14","21","28","35"],2,"Use 1 gal = 4 qt. 7 × 4 = 28.",["gallon-quart"]),
q("uni-m-02","easy","How many inches are in 9 feet?",["81","96","108","120"],2,"1 ft = 12 in, so 9 × 12 = 108.",["feet-inches"]),
q("uni-m-03","easy","How many items are in 3 dozen?",["24","30","36","144"],2,"1 dozen = 12. So 3 × 12 = 36.",["dozen"]),
q("uni-m-04","easy","How many ounces are in 2.5 pounds?",["20","30","40","50"],2,"1 lb = 16 oz, so 2.5 × 16 = 40 oz.",["pounds-ounces"]),
q("uni-m-05","easy","Convert 4 yards to feet.",["7","10","12","16"],2,"1 yd = 3 ft, so 4 × 3 = 12.",["yards-feet"]),
q("uni-m-06","medium","Convert 84 inches to feet.",["5","6","7","8"],2,"Reverse direction means divide: 84 ÷ 12 = 7.",["reverse-conversion"]),
q("uni-m-07","medium","A recipe calls for 3.5 quarts of broth. How many gallons is that?",["0.75","0.875","1.25","1.5"],1,"4 qt = 1 gal, so 3.5 ÷ 4 = 0.875 gal.",["quarts-gallons","reverse-conversion"]),
q("uni-m-08","medium","Convert 324 square feet to square yards.",["18","27","36","108"],2,"Square units use factor 9: 324 ÷ 9 = 36 yd².",["square-units"]),
q("uni-m-09","medium","Convert 5 ft 7 in to inches.",["57","60","67","72"],2,"5 ft = 60 in, then 60 + 7 = 67 in.",["mixed-units"]),
q("uni-m-10","medium","Convert 2.2 tons to pounds.",["2,200","3,200","4,400","5,200"],2,"1 ton = 2,000 lb, so 2.2 × 2,000 = 4,400 lb.",["tons-pounds"]),
q("uni-m-11","medium","A pump moves 3 gallons every 2 minutes. How many quarts in 6 minutes?",["24","30","36","48"],2,"In 6 min, gallons = (6/2) × 3 = 9 gal. Then 9 × 4 = 36 qt.",["rate-conversion","multi-step-conversion"]),
q("uni-m-12","hard","A 1.5-mile jog is how many feet?",["5,280","6,600","7,920","10,560"],2,"1 mile = 5,280 ft. 1.5 × 5,280 = 7,920 ft.",["miles-feet"]),
q("uni-m-13","hard","A floor is 12 ft by 18 ft. What is the area in square yards?",["18","21","24","27"],2,"Area = 12 × 18 = 216 ft². Then 216 ÷ 9 = 24 yd².",["area","square-units"]),
q("uni-m-14","hard","45 quarts of juice are split equally into 6 jugs. How many gallons per jug?",["1.25","1.5","1.875","2.25"],2,"Per jug: 45 ÷ 6 = 7.5 qt. Convert: 7.5 ÷ 4 = 1.875 gal.",["quarts-gallons","multi-step-conversion"]),
q("uni-m-15","expert","A shelter has 1.2 tons of food. Each person needs 24 oz per meal, 3 meals/day, for 4 days. How many full people can be served?",["120","128","133","144"],2,"1.2 tons = 2,400 lb = 38,400 oz. Per person: 24 × 3 × 4 = 288 oz. 38,400 ÷ 288 = 133.33, so 133 full people.",["multi-step-conversion","rate"])
]
add_quiz("unit-conversion-mastery","Unit Conversion Mastery Quiz","unit-conversion","mastery",uni_m)

uni_s = [
q("uni-s-01","easy","1 gallon = how many quarts?",["2","3","4","8"],2,"Memory fact: 1 gal = 4 qt.",["speed"]),
q("uni-s-02","easy","1 yard = how many feet?",["2","3","4","6"],1,"Memory fact: 1 yd = 3 ft.",["speed"]),
q("uni-s-03","easy","1 pound = how many ounces?",["8","12","16","24"],2,"Memory fact: 1 lb = 16 oz.",["speed"]),
q("uni-s-04","easy","1 gross =",["12","24","120","144"],3,"Memory fact: 1 gross = 144.",["speed"]),
q("uni-s-05","medium","36 inches =",["2 ft","3 ft","4 ft","6 ft"],1,"12 in = 1 ft, so 36 ÷ 12 = 3 ft.",["speed"]),
q("uni-s-06","medium","20 quarts =",["4 gal","5 gal","6 gal","8 gal"],1,"4 qt = 1 gal, so 20 ÷ 4 = 5 gal.",["speed"]),
q("uni-s-07","medium","45 ft² =",["3 yd²","5 yd²","9 yd²","15 yd²"],1,"Square units divide by 9: 45 ÷ 9 = 5.",["speed"]),
q("uni-s-08","medium","72 oz =",["4 lb","4.5 lb","5 lb","6 lb"],1,"Quick divide: 72 ÷ 16 = 4.5 lb.",["speed"]),
q("uni-s-09","medium","2.5 yards =",["72 in","84 in","90 in","96 in"],2,"2.5 yd × 3 = 7.5 ft; 7.5 × 12 = 90 in.",["speed","two-step"]),
q("uni-s-10","medium","At 2 gallons per day, how many quarts are used in 3 days?",["16","20","24","32"],2,"3 days × 2 gal = 6 gal, then 6 × 4 = 24 qt.",["speed","two-step","rate"])
]
add_quiz("unit-conversion-speed","Unit Conversion Speed Drill","unit-conversion","speed",uni_s)

# Mixed 20
mix = [
q("lvl1-mix-01","easy","Evaluate: 14 − 2 × 5",["20","4","60","24"],1,"Multiply first: 2 × 5 = 10; 14 − 10 = 4.",["pemdas"]),
q("lvl1-mix-02","easy","Compute: 0.4 × 0.2",["0.8","0.08","0.02","8"],1,"4 × 2 = 8, two decimal places total gives 0.08.",["decimals"]),
q("lvl1-mix-03","easy","What is 1/5 of 35?",["5","6","7","8"],2,"35 × 1/5 = 7.",["fractions"]),
q("lvl1-mix-04","easy","What is 25% of 80?",["10","20","25","40"],1,"25% means one-fourth. 80 ÷ 4 = 20.",["percents"]),
q("lvl1-mix-05","easy","Convert 3 gallons to quarts.",["7","12","16","24"],1,"3 × 4 = 12.",["unit-conversion"]),
q("lvl1-mix-06","medium","Evaluate: (9 + 3) ÷ 4",["2","3","4","5"],1,"12 ÷ 4 = 3.",["pemdas"]),
q("lvl1-mix-07","medium","Compute: 4.8 ÷ 0.6",["0.8","8","80","6"],1,"48 ÷ 6 = 8.",["decimals"]),
q("lvl1-mix-08","medium","Compute: 2/3 + 1/3",["1/3","2/3","1","3/3"],2,"Same denominator: 3/3 = 1.",["fractions"]),
q("lvl1-mix-09","medium","A $50 item has 10% tax. What is the total?",["$50","$52","$55","$60"],2,"Tax = 5, total = 55.",["percents"]),
q("lvl1-mix-10","medium","Convert 2.5 yards to feet.",["5.5","6.5","7.5","8.5"],2,"2.5 × 3 = 7.5.",["unit-conversion"]),
q("lvl1-mix-11","medium","Evaluate: 3 + 12 ÷ 4 × 2",["9","12","15","18"],0,"12 ÷ 4 = 3, 3 × 2 = 6, then 3 + 6 = 9.",["pemdas"]),
q("lvl1-mix-12","medium","Compute: $1.75 × 8",["$12.00","$13.50","$14.00","$15.00"],2,"1.75 × 8 = 14.",["decimals","money"]),
q("lvl1-mix-13","medium","If 3/4 of a number is 27, the number is",["30","32","36","40"],2,"x = 27 × 4/3 = 36.",["fractions"]),
q("lvl1-mix-14","medium","12 is what percent of 48?",["20%","25%","30%","40%"],1,"12/48 = 1/4 = 25%.",["percents"]),
q("lvl1-mix-15","hard","A carpet measures 12 ft by 15 ft. What is its area in square yards?",["18","20","24","30"],1,"Area is 180 ft². Divide by 9 to get 20 yd².",["unit-conversion","area"]),
q("lvl1-mix-16","hard","Evaluate: 2 × (5 + 4^2) − 6",["30","36","40","42"],1,"4^2 = 16; 5 + 16 = 21; 2 × 21 = 42; 42 − 6 = 36.",["pemdas"]),
q("lvl1-mix-17","hard","Compute: 0.84 ÷ 0.07",["1.2","12","120","0.12"],1,"84 ÷ 7 = 12.",["decimals"]),
q("lvl1-mix-18","hard","After a 20% discount, a coat costs $72. What was the original price?",["$80","$84","$90","$96"],2,"72 is 80% of original. 72 ÷ 0.8 = 90.",["percents","reverse-percent"]),
q("lvl1-mix-19","hard","A jug is 5/6 full. If 1/3 of the jug is poured out, what fraction remains?",["1/2","2/3","3/5","1/3"],0,"5/6 − 1/3 = 5/6 − 2/6 = 3/6 = 1/2.",["fractions"]),
q("lvl1-mix-20","expert","A warehouse has 2.25 tons of gravel. If each bag holds 45 pounds, how many full bags can be filled?",["90","95","100","110"],2,"2.25 tons = 4,500 lb. 4,500 ÷ 45 = 100.",["unit-conversion","multi-step"])
]
add_quiz("level1-mixed-test","Level 1 Mixed Test","level-1","mixed",mix)

chal = [
q("lvl1-ch-01","medium","Evaluate: 18 − 3 × (2 + 1)",["9","12","15","45"],0,"2 + 1 = 3; 3 × 3 = 9; 18 − 9 = 9.",["pemdas"]),
q("lvl1-ch-02","medium","Compute: 2.75 × 4",["9","10","11","12"],2,"2.75 × 4 = 11.",["decimals"]),
q("lvl1-ch-03","medium","What is 40% of 45?",["16","18","20","22"],1,"0.40 × 45 = 18.",["percents"]),
q("lvl1-ch-04","medium","Compute: 5/8 of 64",["24","32","40","48"],2,"64 × 5/8 = 40.",["fractions"]),
q("lvl1-ch-05","medium","Convert 0.5 gallon to quarts.",["1","2","3","4"],1,"Half a gallon is 2 quarts.",["unit-conversion"]),
q("lvl1-ch-06","medium","Evaluate: 7 + 18 ÷ (3 × 2)",["10","13","16","25"],0,"3 × 2 = 6; 18 ÷ 6 = 3; 7 + 3 = 10.",["pemdas"]),
q("lvl1-ch-07","medium","Compute: 6.3 ÷ 0.9",["0.7","7","70","9"],1,"63 ÷ 9 = 7.",["decimals"]),
q("lvl1-ch-08","medium","A $120 item is marked down 15%. What is the sale price?",["$96","$100","$102","$108"],2,"Discount is 18; sale price is 102.",["percents"]),
q("lvl1-ch-09","medium","Compute: 7/12 + 1/6",["3/4","2/3","5/6","7/18"],0,"1/6 = 2/12; sum is 9/12 = 3/4.",["fractions"]),
q("lvl1-ch-10","medium","Convert 1.5 miles to feet.",["5,280","6,600","7,920","8,400"],2,"1.5 × 5,280 = 7,920.",["unit-conversion"]),
q("lvl1-ch-11","hard","Evaluate: 32 ÷ 2^2 + 5 × 3",["23","31","47","63"],0,"2^2 = 4; 32 ÷ 4 = 8; 5 × 3 = 15; total 23.",["pemdas"]),
q("lvl1-ch-12","hard","Compute: 0.125 × 64",["4","6","8","16"],2,"0.125 is 1/8; 64 ÷ 8 = 8.",["decimals","anchor"]),
q("lvl1-ch-13","hard","A price rises from $80 to $92. What is the percent increase?",["12%","15%","20%","25%"],1,"Increase is 12; 12/80 = 15%.",["percents"]),
q("lvl1-ch-14","hard","If 5/7 of a number is 45, the number is",["49","56","63","72"],2,"x = 45 × 7/5 = 63.",["fractions"]),
q("lvl1-ch-15","hard","How many square feet are in 3 square yards?",["9","18","27","36"],2,"1 yd² = 9 ft², so 3 yd² = 27 ft².",["unit-conversion","area"]),
q("lvl1-ch-16","hard","Evaluate: (4 + 2)^2 ÷ 3",["8","10","12","14"],2,"6^2 = 36; 36 ÷ 3 = 12.",["pemdas"]),
q("lvl1-ch-17","hard","A worker earns $14.40 per hour. How much for 7.5 hours?",["$96.00","$102.00","$108.00","$112.50"],2,"14.4 × 7.5 = 108.",["decimals","money"]),
q("lvl1-ch-18","hard","A town drops from 500 people to 425 people. Percent decrease?",["10%","12%","15%","20%"],2,"Decrease is 75; 75/500 = 15%.",["percents"]),
q("lvl1-ch-19","hard","A class read 2/3 of a book Monday and 1/6 Tuesday. What fraction of the book was read by Tuesday night?",["4/5","5/6","3/4","1"],1,"2/3 = 4/6; 4/6 + 1/6 = 5/6.",["fractions"]),
q("lvl1-ch-20","hard","A 48-quart cooler holds how many gallons?",["10","11","12","16"],2,"48 ÷ 4 = 12.",["unit-conversion"]),
q("lvl1-ch-21","expert","Evaluate: 40 − [8 + 3 × (2^3 − 5)]",["23","25","27","29"],0,"2^3 = 8; 8 − 5 = 3; 3 × 3 = 9; bracket is 17; 40 − 17 = 23.",["pemdas"]),
q("lvl1-ch-22","expert","A machine produces 0.75 pound of material per cycle. How many cycles are needed to produce 18 pounds?",["18","21","24","27"],2,"18 ÷ 0.75 = 24.",["decimals","word-problem"]),
q("lvl1-ch-23","expert","An item is discounted 25% and then taxed 8% on the sale price. The original price is $80. Final price?",["$60.00","$62.40","$64.80","$68.00"],2,"80 × 0.75 = 60; 60 × 1.08 = 64.8.",["percents","multi-step"]),
q("lvl1-ch-24","expert","If 3/8 of a tank is filled and then 1/4 of the tank is added, what fraction is full now?",["5/8","7/8","1/2","3/4"],0,"1/4 = 2/8; 3/8 + 2/8 = 5/8.",["fractions"]),
q("lvl1-ch-25","expert","A shipment weighs 2.4 tons. If each crate holds 80 pounds, how many crates are needed?",["50","55","60","65"],2,"2.4 tons = 4,800 lb. Then 4,800 ÷ 80 = 60.",["unit-conversion","multi-step"])
]
add_quiz("level1-challenge-test","Level 1 Challenge Test","level-1","challenge",chal)

data={"levelId":"ar-level-1","title":"Level 1 (Number Mechanics)","quizzes":quizzes}
text = json.dumps(data, ensure_ascii=False, indent=2)
script_dir = Path(__file__).resolve().parent
math_study = script_dir.parent.parent.parent  # quiz-design -> gpt-lesson-update -> docs -> math-study
out_dir = math_study / "src" / "data" / "quiz"
out_dir.mkdir(parents=True, exist_ok=True)
(out_dir / "arLevel1Quizzes.raw.json").write_text(text, encoding="utf-8")
