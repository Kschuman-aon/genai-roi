# Quiz: Prompting, Deployment, and Model Optimization Basics

Test your understanding of prompting, deployment, and model optimization with these review questions.

---

#### 1. What is a system prompt?

<div class="upper-alpha" markdown>
1. The end user's specific question submitted in a single request
2. A numerical representation of a piece of text used for similarity search
3. A persistent segment of instructions, usually invisible to the end user, that sets the model's role, tone, and constraints for the whole conversation
4. The retrieved text a RAG system inserts into a prompt
</div>

??? question "Show Answer"
    The correct answer is **C**. The system prompt is a persistent, usually invisible segment that sets the model's role, tone, and constraints across an entire conversation, and it is typically resent with every request. Option A describes an ordinary user prompt, not the persistent instruction layer. Option B describes an embedding. Option D describes retrieved context in a RAG pipeline, a separate mechanism entirely.

    **Concept Tested:** System Prompt

---

#### 2. What is prompt engineering?

<div class="upper-alpha" markdown>
1. The practice of deliberately designing prompts to reliably get better, more accurate, or more consistent output from a model
2. The process of permanently updating a model's internal weights through additional training
3. The technique of compressing a model's parameters to reduce memory footprint
4. The process of converting text into a numerical vector for similarity search
</div>

??? question "Show Answer"
    The correct answer is **A**. Prompt engineering is the deliberate practice of designing prompts to reliably improve the accuracy, consistency, or usefulness of a model's output, and the chapter calls it the highest-leverage, lowest-cost lever for reducing spend. Option B describes fine-tuning, a fundamentally different and more expensive approach. Option C describes model quantization. Option D describes creating an embedding, unrelated to how a prompt itself is written.

    **Concept Tested:** Prompt Engineering

---

#### 3. How does few-shot prompting differ from zero-shot prompting in terms of cost?

<div class="upper-alpha" markdown>
1. Few-shot prompting reduces the number of tokens needed because the model requires less explanation
2. Few-shot prompting only affects the length of the model's generated output, not its input
3. Few-shot and zero-shot prompting always cost exactly the same because the task is identical
4. Few-shot prompting includes worked examples in the prompt, consuming additional input tokens on every request compared to zero-shot's plain instruction
</div>

??? question "Show Answer"
    The correct answer is **D**. Few-shot prompting prepends a small number of worked examples before the actual task, and each example consumes real input tokens on every single request, unlike zero-shot's bare instruction. Option A reverses the cost effect; few-shot costs more, not less. Option B is incorrect because few-shot's added cost falls on input tokens, not output length. Option C ignores the token cost difference the chapter explicitly quantifies.

    **Concept Tested:** Few-Shot Prompting

---

#### 4. Why does chain-of-thought prompting typically increase cost in a different way than few-shot prompting does?

<div class="upper-alpha" markdown>
1. It increases the number of examples included in the prompt, not the length of the response
2. It increases the length of the model's generated output, since the reasoning steps themselves are generated text, rather than adding input tokens
3. It requires a vector database to store reasoning steps
4. It has no effect on token cost because reasoning happens internally without generating text
</div>

??? question "Show Answer"
    The correct answer is **B**. Chain-of-thought prompting asks the model to reason through intermediate steps before its final answer, and those reasoning steps are generated text that lengthens the output, unlike few-shot's added input tokens. Option A describes few-shot prompting, not chain-of-thought. Option C invents a dependency on retrieval infrastructure that the technique does not require. Option D is false; the reasoning steps are visible, billed output tokens.

    **Concept Tested:** Chain-Of-Thought Prompting

---

#### 5. What is model hallucination?

<div class="upper-alpha" markdown>
1. A deliberate error introduced by a provider to test system robustness
2. The delay between sending a request and receiving a response
3. The process of retrieving relevant text from an external source before answering
4. A confident, fluent, plausible-sounding response that is factually wrong or entirely fabricated
</div>

??? question "Show Answer"
    The correct answer is **D**. Model hallucination is a confident, fluent, plausible-sounding response that is factually wrong or entirely fabricated, arising because models predict statistically likely next words rather than consulting a source of truth. Option A wrongly frames it as intentional testing rather than a structural risk. Option B describes model latency. Option C describes retrieval, the technique used to reduce hallucination, not hallucination itself.

    **Concept Tested:** Model Hallucination

---

#### 6. What is the primary purpose of retrieval-augmented generation (RAG)?

<div class="upper-alpha" markdown>
1. To reduce hallucination by grounding the model's response in text retrieved from an external source before generating an answer
2. To permanently update a model's weights with new information
3. To reduce a model's memory footprint by lowering numerical precision
4. To increase a model's context window size automatically
</div>

??? question "Show Answer"
    The correct answer is **A**. RAG retrieves relevant text from an external source and inserts it into the prompt before the model answers, grounding the response in verifiable material and sharply reducing, though not eliminating, hallucination on covered topics. Option B describes fine-tuning, not RAG, which changes nothing about the model's weights. Option C describes model quantization. Option D confuses RAG with a context-window change, which RAG does not perform.

    **Concept Tested:** Retrieval-Augmented Generation

---

#### 7. What role does a vector database play in a RAG pipeline?

<div class="upper-alpha" markdown>
1. It permanently stores the model's trained parameters
2. It stores millions of embeddings and quickly returns the stored text most similar in meaning to a new query
3. It converts a user's query into a fluent natural-language response
4. It tracks distinct, identifiable releases of a model over time
</div>

??? question "Show Answer"
    The correct answer is **B**. A vector database is built to hold millions of embeddings and answer, in milliseconds, which stored pieces of text are most similar in meaning to a new query, making fast retrieval possible. Option A describes where a model's own weights live, not a vector database. Option C describes what the language model itself does, not the database. Option D describes model versioning, an unrelated deployment practice.

    **Concept Tested:** Vector Database

---

#### 8. A deployment team turns on batch inference and observes that system-wide throughput doubles while individual request latency increases significantly. What is the underlying reason for this trade-off?

<div class="upper-alpha" markdown>
1. Batch inference reduces the total number of tokens generated per request
2. Batch inference switches the model to a smaller, distilled version automatically
3. Batch inference processes multiple requests together in a single pass, improving total work done per unit of GPU time, but an individual request may wait for a batch to fill before processing begins
4. Batch inference eliminates the need for a vector database in retrieval tasks
</div>

??? question "Show Answer"
    The correct answer is **C**. Batch inference groups multiple requests into a single pass through the model, which raises throughput by getting more total work done per unit of GPU time, but an individual request may sit waiting for its batch to fill, raising that request's latency. Option A misattributes the effect to token count rather than processing structure. Option B confuses batching with knowledge distillation. Option D is unrelated; batching has no bearing on retrieval infrastructure.

    **Concept Tested:** Batch Inference

---

#### 9. A financial services company has strict data-privacy requirements, substantial upfront capital available, and an experienced in-house infrastructure team. Which deployment approach best matches these circumstances?

<div class="upper-alpha" markdown>
1. Cloud-hosted deployment, trading upfront capital for ongoing operating expense and less control
2. On-premises deployment, maximizing control over data privacy by running the model on infrastructure the company owns and operates
3. Knowledge distillation, to train a smaller student model from a larger teacher model
4. Zero-shot prompting, to avoid the cost of writing worked examples
</div>

??? question "Show Answer"
    The correct answer is **B**. On-premises deployment maximizes control over data privacy and lets an organization fully own hardware costs, at the price of significant upfront capital and in-house expertise — exactly the profile this company has. Option A describes the opposite trade-off, favored by teams without capital or infrastructure staff. Option C addresses model size and cost, not deployment location. Option D is a prompting technique, unrelated to where a model physically runs.

    **Concept Tested:** On-Premises Deployment

---

#### 10. Which of the following best describes model right-sizing?

<div class="upper-alpha" markdown>
1. Reducing the numerical precision used to store a model's parameters
2. Training a new, smaller model to mimic the outputs of a larger teacher model
3. Increasing a model's context window to handle longer documents
4. Deliberately choosing the smallest, cheapest model that still meets accuracy and latency requirements for a given task, rather than defaulting to the largest available model
</div>

??? question "Show Answer"
    The correct answer is **D**. Model right-sizing is the discipline of deliberately choosing the smallest, cheapest model that still meets a task's accuracy and latency requirements, rather than defaulting to the largest, most capable, and most expensive option. Option A describes model quantization. Option B describes knowledge distillation, a related but distinct technique. Option C is unrelated to matching model choice to task difficulty.

    **Concept Tested:** Model Right-Sizing

---
