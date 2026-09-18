# Quiz: Core Concepts of Large Language Models

Test your understanding of the foundational vocabulary of generative AI with these review questions.

---

#### 1. According to the chapter, what is the defining characteristic of artificial intelligence (AI) as a category?

<div class="upper-alpha" markdown>
1. It requires the use of deep neural networks with many layers
2. It performs tasks that would otherwise be considered to require human intelligence
3. It learns exclusively from labeled training data rather than hand-written rules
4. It produces original content rather than merely classifying existing content
</div>

??? question "Show Answer"
    The correct answer is **B**. AI is defined in capability-based terms: any system that performs a task otherwise thought to require human intelligence, regardless of the underlying technique. Option A describes deep learning specifically, a much narrower subset of AI. Option C describes machine learning, which learns from data rather than AI as a whole. Option D describes generative AI, a further subset within deep learning. AI itself does not require any particular mechanism.

    **Concept Tested:** Artificial Intelligence

---

#### 2. Which of the following best distinguishes machine learning from AI in general, as described in the chapter?

<div class="upper-alpha" markdown>
1. Machine learning systems improve performance by learning patterns from data rather than following hand-written rules
2. Machine learning systems must be based on neural networks with multiple layers
3. Machine learning refers only to systems that generate new content rather than classify it
4. Machine learning is a marketing term with no meaningful technical distinction from AI
</div>

??? question "Show Answer"
    The correct answer is **A**. Machine learning is the subfield of AI in which a system improves performance by learning patterns from data, illustrated by a spam filter trained on labeled emails rather than hand-written rules. Option B describes deep learning, a narrower subset of ML. Option C describes generative AI, not machine learning generally. Option D is incorrect; the chapter treats the ML/AI distinction as economically significant because it changes what you actually pay for.

    **Concept Tested:** Machine Learning

---

#### 3. Which statement correctly describes the relationship among artificial intelligence, machine learning, deep learning, and neural networks?

<div class="upper-alpha" markdown>
1. They are four separate, unrelated approaches to building intelligent systems
2. Neural networks are a subset of deep learning, which is a subset of AI but not of machine learning
3. Machine learning is a subset of deep learning, which is a subset of AI
4. Each narrower term nests inside the broader one: deep learning is a subset of machine learning, which is a subset of AI, and neural networks are the mechanism deep learning is built on
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter describes these terms as nesting like Russian dolls: every neural network is deep learning, every deep learning system is machine learning, and every machine learning system is AI, but never the reverse. Option A ignores this nesting entirely. Option B skips over machine learning in the chain. Option C reverses which term contains which.

    **Concept Tested:** Deep Learning

---

#### 4. What distinguishes a generative AI model from a discriminative model?

<div class="upper-alpha" markdown>
1. A generative model sorts inputs into predefined categories, while a discriminative model produces new examples
2. A generative model requires no training data, while a discriminative model requires labeled data
3. A generative model learns the underlying pattern of a class of data well enough to produce new, original examples, while a discriminative model sorts inputs into categories
4. There is no meaningful difference; the terms are interchangeable
</div>

??? question "Show Answer"
    The correct answer is **C**. A generative AI model learns a class of data's underlying pattern well enough to produce new, original examples, while a discriminative model sorts inputs into existing categories, such as flagging spam or fraud. Option A reverses these two definitions. Option B is false; both approaches require training data. Option D is incorrect because the chapter treats this distinction as economically important, since generation requires substantially more computation than classification.

    **Concept Tested:** Generative AI

---

#### 5. Why does processing a longer passage of text cost substantially more than twice as much when its length is doubled, according to the chapter's discussion of self-attention?

<div class="upper-alpha" markdown>
1. Longer passages require more pretraining data to be collected in advance
2. Self-attention compares every word in the passage against every other word, so computation grows faster than the text length itself
3. Longer passages always require a larger model with more parameters
4. The model must fine-tune itself on the fly for each new passage it processes
</div>

??? question "Show Answer"
    The correct answer is **B**. Because self-attention compares every word against every other word, the computation it requires grows faster than the length of the input text, so doubling a passage's length more than doubles the processing cost. Option A confuses this with data collection for pretraining, an unrelated stage. Option C incorrectly ties passage length to parameter count. Option D describes fine-tuning, which does not occur automatically during inference.

    **Concept Tested:** Self-Attention

---

#### 6. What happens during the pretraining stage of a large language model's development?

<div class="upper-alpha" markdown>
1. The model is adjusted using human preference comparisons between pairs of responses
2. The model is trained on a small, domain-specific dataset such as a company's support transcripts
3. The model is taught to treat prompts as instructions rather than text to continue
4. The model is exposed to a massive, general corpus of text and learns broad language patterns by repeatedly predicting the next word
</div>

??? question "Show Answer"
    The correct answer is **D**. Pretraining is the first and most expensive stage, in which a model is exposed to a massive, general corpus of text and learns grammar, facts, and reasoning patterns by repeatedly predicting the next word. Option A describes RLHF alignment. Option B describes fine-tuning on a smaller, domain-specific dataset. Option C describes instruction tuning. Each of these later stages builds on, and costs far less than, pretraining.

    **Concept Tested:** Pretraining

---

#### 7. How does RLHF (Reinforcement Learning from Human Feedback) alignment differ from instruction tuning?

<div class="upper-alpha" markdown>
1. RLHF refines model behavior using human preference judgments between response pairs, while instruction tuning trains on fixed instruction-response examples
2. RLHF is a stage that occurs before pretraining, while instruction tuning occurs after
3. RLHF trains an entirely new, smaller model, while instruction tuning compresses an existing model's parameters
4. RLHF and instruction tuning are two names for the exact same process
</div>

??? question "Show Answer"
    The correct answer is **A**. RLHF alignment refines a model's behavior using human judgments about which of two responses is preferred, while instruction tuning trains on fixed pairs of instructions and correct responses. Option B misstates the sequence; both stages occur after pretraining. Option C describes an unrelated model-compression technique, not either of these fine-tuning stages. Option D wrongly treats the two stages as identical, when they use different training signals.

    **Concept Tested:** RLHF Alignment

---

#### 8. A foundation model costs $10 million to pretrain and a fraction of a cent per query to run. What is the underlying reason its cumulative inference cost can eventually exceed its one-time training cost?

<div class="upper-alpha" markdown>
1. Inference requires more GPU memory per request than training does
2. Providers deliberately price inference higher than training to recover costs faster
3. Inference is a small, recurring per-request expense that accumulates without limit as usage volume grows, while training is a one-time cost
4. Training costs are refunded once a model reaches a certain number of users
</div>

??? question "Show Answer"
    The correct answer is **C**. Training is typically a one-time or infrequent expense, while inference is a small per-request cost that recurs on every single use; at sufficient usage volume, the accumulated inference cost surpasses the one-time training cost. Option A misattributes the cause to memory requirements rather than cost structure. Option B assumes a deliberate pricing strategy the chapter does not describe. Option D describes a refund mechanism that does not exist.

    **Concept Tested:** Training Vs Inference Cost

---

#### 9. What does a model's context window determine?

<div class="upper-alpha" markdown>
1. The total number of parameters the model has learned during training
2. Whether the model can process images in addition to text
3. The organization that hosts and provides access to the model
4. The maximum amount of text, measured in tokens, that the model can consider at once, including both the prompt and its response
</div>

??? question "Show Answer"
    The correct answer is **D**. The context window is the maximum amount of text, measured in tokens, that a model can consider at once, covering both the prompt sent to it and the response it generates. Option A describes model parameter count, a distinct measure of learned scale. Option B describes multimodal capability. Option C describes the role of a model provider. None of these concern how much text a model can process in a single request.

    **Concept Tested:** Context Window

---

#### 10. A small startup wants to deploy a large language model quickly but has no engineering staff available to provision or maintain GPU infrastructure. Based on the trade-offs described in the chapter, which deployment approach best fits this situation?

<div class="upper-alpha" markdown>
1. Download an open-source model's weights and host it on self-managed infrastructure
2. Access a proprietary model through a provider's API endpoint, accepting a higher per-call price in exchange for no hosting burden
3. Pretrain a new foundation model from scratch to have full control over costs
4. Use a purely rule-based system instead of a large language model
</div>

??? question "Show Answer"
    The correct answer is **B**. A proprietary model accessed through a provider's API endpoint trades a higher per-call price for zero hosting burden, which fits a team without infrastructure capacity. Option A requires exactly the in-house engineering effort the startup lacks. Option C describes pretraining a foundation model from scratch, an enormously expensive undertaking unrelated to quick deployment. Option D abandons generative AI capability entirely, which does not meet the stated need.

    **Concept Tested:** Proprietary Model

---
