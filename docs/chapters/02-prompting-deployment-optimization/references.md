# References: Prompting, Deployment, and Model Optimization Basics

1. [Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) - Wikipedia - Covers zero-shot, few-shot, and chain-of-thought prompting with worked examples across multiple task types, directly supporting the chapter's prompting-technique comparison and cost framing.

2. [Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Explains the embed-retrieve-augment-generate pipeline, its role in reducing hallucination, and its known limitations, grounding the chapter's RAG and vector-database discussion.

3. [Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_%28artificial_intelligence%29) - Wikipedia - Traces the causes, terminology history, and real-world consequences of model hallucination, the exact risk this chapter's RAG-based grounding techniques are designed to reduce.

4. Speech and Language Processing (3rd ed. draft) - Dan Jurafsky and James H. Martin - Stanford University (online draft) - Credited for one of the clearest published treatments of prompting patterns and in-context learning, using worked examples that have become a standard teaching reference.

5. Natural Language Processing with Transformers - Lewis Tunstall, Leandro von Werra, and Thomas Wolf - O'Reilly Media - Credited for a distinctly hands-on, code-first explanation of model deployment, quantization, and distillation that many practitioner-facing courses have modeled their own explanations on.

6. [What is a Vector Database & How Does it Work?](https://www.pinecone.io/learn/vector-database/) - Pinecone - Explains embeddings and vector similarity search with concrete comparisons to traditional databases and standalone indexes, supporting the chapter's RAG infrastructure discussion.

7. [What is knowledge distillation?](https://www.ibm.com/think/topics/knowledge-distillation) - IBM Think - Explains the teacher-student model compression technique, including response-based, feature-based, and relation-based distillation approaches, and why capability alone is not enough without cost efficiency.

8. [What Is In-Context Learning (ICL)?](https://www.ibm.com/think/topics/in-context-learning) - IBM Think - Practitioner-level explanation of zero-shot, one-shot, few-shot, and chain-of-thought prompting strategies with a worked sentiment-classification example, complementing the chapter's cost-tradeoff framing of each.

9. [What is Quantization?](https://www.ibm.com/think/topics/quantization) - IBM Think - Explains how reducing numerical precision (e.g., FP32 to INT8) shrinks a model's memory footprint and speeds inference, with worked quantization examples.

10. [What is LLM Inference?](https://www.ibm.com/think/topics/llm-inference) - IBM Think - Defines latency and throughput as inference performance metrics and discusses batching and KV-cache tradeoffs, directly supporting the chapter's serving-speed section.
