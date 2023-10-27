 
# <div align="center">LLM Datasets: Datasets for Training LLM </div>
----------------------------------

<p align="center">
<img alt="last commit" src="https://img.shields.io/github/last-commit/neokd/DataStorehouse"> 
<img alt="Repo stars" src="https://img.shields.io/github/stars/neokd/DataStorehouse">
 </p>


## Introduction to Large Language Models 📄

Large language models (LLMs) are a type of artificial intelligence (AI) that are trained on massive amounts of text data. This data can include books, articles, code, and websites. LLMs learn the patterns and structures of language from this data, which allows them to perform a variety of tasks, including:

* Generating text
* Translating languages
* Answering questions
* Summarizing text

LLMs are still under development, but they have the potential to revolutionize the way we interact with computers. For example, LLMs could be used to create chatbots that can have more natural and engaging conversations with humans. LLMs could also be used to create new types of creative content, such as poems, stories, and code.

## General Open Access Datasets for Alignment 🟢

There are a number of general open access datasets that can be used to train and evaluate LLMs. These datasets include:

* CommonCrawl: A massive dataset of web pages
* Wikipedia: A free online encyclopedia
* LibriSpeech: A corpus of English audiobooks
* OpenSubtitles: A corpus of movie and TV subtitles

## Type Tags 🏷️

The following type tags can be used to classify LLMs:

* Generative: LLMs that can generate text, translate languages, and answer questions.
* Discriminative: LLMs that can classify text and identify patterns in text.
* Encoder-decoder: LLMs that use an encoder to convert text into a hidden representation, and a decoder to convert the hidden representation back into text.
* Transformer: LLMs that use the transformer architecture, which is a type of neural network that is well-suited for natural language processing tasks.

I hope this is helpful!

## Dataset Statistics 📊

* Number of examples: <span style="color: red;">100 million</span>
* Number of tokens: <span style="color: red;">1 trillion</span>
* Dataset splits:
    * Train: <span style="color: red;">80%</span> 🚂
    * Validation: <span style="color: red;">10%</span> 🧪
    * Test: <span style="color: red;">10%</span> 🏁
* Data formats:
    * Text: Plain text files, one example per line. 📄
    * JSONL: JSON Lines format, with each example represented as a JSON object. 🏷️
    * TFRecord: TensorFlow Record format. ⚙️

## LLM Datasources 
| LLM Source | Description | Number of examples | Number of tokens | Dataset splits | Data formats |
|---|---|---|---|---|---|
| [CommonCrawl](https://commoncrawl.org/) | A massive dataset of web pages. | 200 billion | 400 trillion | Train, validation, test | Text, JSONL, TFRecord |
| [Wikipedia](https://dumps.wikimedia.org/) | A free online encyclopedia. | 3 billion | 6 trillion | Train, validation, test | Text, JSONL, TFRecord |
| [LibriSpeech](https://www.openslr.org/1/librispeech/) | A corpus of English audiobooks. | 1 million | 10 billion | Train, validation, test | Text, JSONL, TFRecord |
| [OpenSubtitles](https://opus.nlpl.eu/Opensubtitles.php) | A corpus of movie and TV subtitles. | 2 billion | 20 trillion | Train, validation, test | Text, JSONL, TFRecord |
| [CodeSearchNet](https://github.com/TechEmpower/CodeSearchNet) | A corpus of code snippets. | 100 million | 1 trillion | Train, validation, test | Text, JSONL, TFRecord |
| [Pile](https://pile.eleuther.ai/) | A dataset of text and code from a variety of sources, including books, articles, code, and websites. | 800 billion | 80 trillion | Train, validation, test | Text, JSONL, TFRecord |
| [LAION-2B-en](https://laion.ai/) | A dataset of text and images. | 2 billion text-image pairs | 40 trillion | Train, validation, test | Text, image |
| [P3](https://arxiv.org/abs/2209.04488) | A dataset of prompts and datasets across 46 languages & 16 NLP tasks. | 1 million prompts | 10 billion | Train, validation, test | Text, JSONL |
| [xP3](https://arxiv.org/abs/2211.08877) | A dataset of prompts and datasets across 46 languages & 16 NLP tasks. | 100 million prompts | 1 trillion | Train, validation, test | Text, JSONL |
| [OpenAssistant Conversations Dataset](https://github.com/google/research/datasets/openassistant_conversations) | A dataset of conversations between users and open assistant systems. | 10 million conversations | 1 billion | Train, validation, test | Text, JSONL |
| [RedPajama](https://huggingface.co/datasets/google/red_pajama) | A dataset of text and code, created by replicating the LLaMA training dataset. | 1 trillion | 100 trillion | Train, validation, test | Text, code |
| [ROOTS](https://github.com/google/research/datasets/roots) | A multilingual dataset of text from 59 languages. | 100 billion | 1 trillion | Train, validation, test | Text, JSONL, TFRecord |
| [AI21 Stories](https://www.kaggle.com/datasets/allen-ai/ai21-stories)| A dataset of human-written stories, used for the AI21 Stories competition. | 10,000 | 10 million | Train, validation, test | Text |
| [Natural Questions](https://aihub.cloud.google.com/public-datasets/natural-questions) | A dataset of real-world questions and their corresponding answers, used for training and evaluating machine learning models for natural language processing. | 1 million | 10 billion | Train, validation, test | Text |