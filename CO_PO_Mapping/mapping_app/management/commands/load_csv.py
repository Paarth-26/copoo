# from django.core.management.base import BaseCommand
# from mapping_app.models import CourseOutcome
# import csv

# class Command(BaseCommand):
#     help = 'Load CO-PO data from CSV'

#     def handle(self, *args, **kwargs):
#         with open('Course Outcomes.csv', newline='', encoding='utf-8') as csvfile:
#             reader = csv.reader(csvfile)
#             next(reader)  # Skip header row
#             for row in reader:
#                 co_code = row[0].strip()
#                 co_desc = row[1].strip()
#                 CourseOutcome.objects.get_or_create(code=co_code, description=co_desc)
#                 self.stdout.write(self.style.SUCCESS(f'Loaded CO: {co_code}'))
import csv
import re

def text_to_csv(text, csv_filename="output.csv"):
    """
    Converts a text string into a CSV file.

    Args:
        text (str): The text data to convert.
        csv_filename (str, optional): The name of the CSV file to create. 
                                     Defaults to "output.csv".
    """

    lines = text.split('\n')
    data =[]

    for line in lines:
        # Remove leading/trailing whitespace and split the line by commas.
        # Handle cases where commas might be within quoted strings.
        values = re.split(r',(?=(?:(?:[^"]*"){2})*[^"]*$)', line.strip())
        
        # Clean up individual values: remove extra quotes and whitespace
        cleaned_values = [v.strip().replace('"', '') for v in values]
        data.append(cleaned_values)

    with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)  # Write all rows at once
    
    print(f"CSV file '{csv_filename}' has been created.")

# --- Example Usage ---

# Replace this with your actual text data.  
# For multi-line strings, use triple quotes.
text_data = """
Course ID,Course Name,Course Outcome,Program Outcome,Level of Difficulty,Bloom Taxonomy
DJS23FCBS101,Mathematics-I,"Apply principles of basic operations of matrices to find rank and echelon form of matrices to solve system of simultaneous equations.
Illustrate the basic concepts of Complex numbers and apply the knowledge of complex numbers to solve problems in hyperbolic functions and logarithmic functions.
Illustrate the knowledge Expansion of functions.
Illustrate the basic principles of Partial differentiation and its application to find maxima and minima.
Illustrate SciLab programming techniques to the solution of linear and simultaneous algebraic equations.","PO1, PO2, PO12",Moderate,"Apply (Application), Illustrate (Understanding), Solve (Application/Analysis)"
DJS23FTBS101,Mathematics-I Tutorial,The tutorial aims to help the learner apply the concepts learned in the Mathematics-I course.","PO1, PO2, PO12",Moderate,Apply (Application)
DJS23FCES101,Structured Programming using C,"Implement the programs in C.
Debug the C programs.","PO1, PO2, PO3, PO5, PO12",Easy to Moderate,"Implement (Application), Debug (Analyze)"
DJS23FLES101,Structured Programming using C Laboratory,To provide hands-on experience in developing algorithms, flowcharts, and writing efficient code for user-defined problems.","PO1, PO2, PO3, PO5, PO12",Easy to Moderate,"Develop (Create), Write (Create)"
DJS23FCBS102,Physics,"Relate the scope and foundation of quantum mechanics & quantum computing and its role in the development of modern technology.
Apply the foundations of Optics and Photonics in precision measurements indispensable for the development of modern communication technology.
Assimilate the concepts of Electrodynamics, which are a prerequisite in modern developments for signal communications, Antenna Theory, etc.
Explore basic sensing techniques for physical measurements in modern instrumentation.","PO1, PO2, PO4, PO12",Moderate to Difficult,"Relate (Understand), Apply (Application), Assimilate (Understand), Explore (Understand/Analyze)"
DJS23FLBS102,Physics Laboratory & Tutorial,The laboratory and tutorial are designed to complement the Physics course, providing practical experience and application of concepts.","PO1, PO2, PO4, PO12",Moderate,Apply (Application)
DJS23FCES102,Computational Engineering Mechanics,Not explicitly listed in the provided excerpts.","PO1, PO2, PO3, PO4, PO12",Moderate to Difficult,Not determinable from the excerpts
DJS23FLES102,Computational Engineering Mechanics Laboratory,The laboratory work complements the Computational Engineering Mechanics course.","PO1, PO2, PO3, PO4, PO12",Moderate to Difficult,Not determinable from the excerpts
DJS23FCES103,Basic Electrical Engineering & Digital Electronics,Not explicitly listed in the provided excerpts.","PO1, PO2, PO3, PO5, PO12",Moderate to Difficult,Not determinable from the excerpts
DJS23FLES103,Basic Electrical Engineering & Digital Electronics Laboratory,The laboratory work complements the Basic Electrical Engineering & Digital Electronics course.","PO1, PO2, PO3, PO5, PO12",Moderate to Difficult,Not determinable from the excerpts
DJS23FTLL101,Liberal Learning,"Implement the knowledge of Health and wellness in daily lives.
Apply appropriate & innovative methods to avoid risks from harmful habits.
Employ personal development (both physical & emotional) strategies for better living.
Create a plan for good health through a positive mindset.","PO6, PO7, PO8, PO9, PO10, PO12",Easy,"Implement (Application), Apply (Application), Employ (Application), Create (Create)"
DJS23FCBS103,Chemistry,"Relate the basic concepts in organic reaction mechanism.
Apply the knowledge of stereochemistry to explain the structure and properties of organic molecules.
Explain the concepts of reaction dynamics to chemical reactions.
Illustrate the knowledge of instrumental techniques in chemical analysis.
Illustrate the basic principles of green chemistry.","PO1, PO2, PO4, PO12",Moderate,"Relate (Understand), Apply (Application), Explain (Understand), Illustrate (Understanding)"
DJS23FLBS103,Chemistry Laboratory & Tutorial,To provide hands on experience in Identification and characterization of various organic compounds.","PO1, PO2, PO4, PO12",Moderate,Apply (Application)
DJS23FCES104,Engineering Graphics,Not explicitly listed in the provided excerpts.","PO3, PO5, PO10, PO12",Moderate,Not determinable from the excerpts
DJS23FLES104,Engineering Graphics Laboratory,To provide hands on experience in usage of various CAD software for drawing.","PO3, PO5, PO10, PO12",Moderate,Apply (Application)
DJS23FCES105,Effective Communication Skills,"Apply listening, reading, writing and speaking skills.
Employ effective communication strategies in interpersonal, small group, and public speaking contexts.","PO9, PO10, PO12",Easy to Moderate,"Apply (Application), Employ (Application)"
DJS23FLES105,Effective Communication Skills Laboratory,To provide hands on experience in active listening, reading, writing and speaking.","PO9, PO10, PO12",Easy to Moderate,Apply (Application)
DJS23FLES106,Workshop Practices,To provide hands on experience in manufacturing of simple components using hand tools.","PO3, PO5, PO9, PO12",Moderate,Apply (Application)
DJS23FIHS101,Indian Knowledge System,"Develop a comprehensive understanding of the holistic vision of Indian knowledge traditions.
Develop the ability to relate the study of Indian knowledge system with contemporary modern sciences.","PO6, PO7, PO8, PO12",Moderate,Develop (Understand)
"""

text_to_csv(text_data, "load_csv.csv")  # Creates a file named "my_data.csv"