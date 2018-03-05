import markovify

# Get raw text as string.
with open("./storage/nlp-training.massiveassfile.txt") as f:
    text = f.read()

# Build the model.
text_model = markovify.NewlineText(text)

# Print five randomly-generated sentences
t = ""

while len(t) < 140:
    t += text_model.make_short_sentence(400) + " "

print(t)
