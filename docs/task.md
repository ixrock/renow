# AI-Powered Recommerce Product Suggester

## Background:

At Renow, we're building a platform to make recommerce mainstream. A key challenge is quickly and accurately processing and listing second-hand items. We want to explore how AI and other smart tools can help our operations team and eventually our sellers.

## The Challenge:

Your task is to build a small application that allows a user to input some basic information about a second-hand electronic gadget (e.g., smartphone, laptop, headphones). The application should then use appropriate tools or an AI service (like Google Gemini, which you can access via their free tier) to:

1.  Generate a compelling, short product marketing text suitable for a marketplace listing (an LLM is well-suited for this).
2.  Suggest a product category, preferably from the Google product taxonomy. Consider whether an LLM or other algorithmic approach would be more appropriate and document your choice.

The application should allow users to see these generated suggestions. No backend or database persistence is required for this task.

## Core Requirements:

1.  Frontend Application (React, TypeScript):
    * A simple form to input:
        * Product Name (e.g., "iPhone 12 Pro")
        * Condition (e.g., "Good", "Fair", "Like New" - dropdown)
        * Brief notes about the item (e.g., "Slight scratch on corner, battery health 85%")
    * A way to trigger the suggestion process.
    * A section to display the:
        * Generated marketing text
        * Suggested category
    * Styling is not a primary concern, but it should be usable.
    * State should be managed within the React application.
    * Implement proper error handling for API failures, including basic user feedback
    * Ensure basic accessibility best practices are followed in your form and display elements.

2.  Suggestion Logic & AI Integration (Client-Side):
    * Implement the logic to generate the category and description.
    * For LLM-based suggestions:
        * You will need to sign up for API access to a model like Google Gemini (in order to use their free tier).
        * Important: For this demo, you may call the AI API directly from the frontend using environment variables. However:
            * Document in your code comments where you would implement the backend proxy
            * In your README architecture section, detail how you would secure API communications in production
        * Prompt Engineering is key: If using an LLM, craft your prompts carefully to get the desired output. You might want to check out if other functionality that would help with this is supported by your provider.
    * Select the category from the Google product taxonomy categories.
        * Implement your chosen approach and explain your reasoning in the README.
        * Select a subset (10-20 categories) from the taxonomy categories (e.g., Electronics with some sub-categories) to simplify things.
        * The taxonomy file is available at: https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt
        * Additional context: https://support.google.com/merchants/answer/6324436?hl=en
    * Include at least one unit test for your prompt generation logic

3.  README:
    * Clear instructions on how to set up and run your project (dependencies, environment variables like AI API keys).
    * Briefly note (bullet points are fine) any key design choices or trade-offs you made. The code should speak for itself.

4. Prepare yourself for a discussion about how you would extend this application to a production-grade full-stack solution

## Bonus Points (Showcasing further skills - attempt only if you have time over):

* UI/UX Enhancements: Add loading states, better visual feedback, or basic responsive design.
* Integration testing: Include one integration test for the form submission flow.

## What We Value (and will look for in your submission):

* Problem Solving: How you approach the task and overcome any hurdles, especially in integrating different pieces of logic client-side.
* Code Quality: Clean, well-structured, and maintainable TypeScript and React code.
* Understanding of Core Frontend Technologies: Correct and effective use of React, TypeScript, and handling asynchronous operations.
* AI Integration: Thoughtful prompt design and handling of API responses, as well as selecting the right tool for the right task.
* Pragmatism: A working solution that meets the core requirements is prioritized over attempting all bonus points partially.
* Communication: Clarity in your README.
* "Using whatever means available": We encourage you to use documentation, AI coding assistants and agents, online resources, and any tools you are comfortable with to complete the task efficiently. The goal is to see what you can build in a short timeframe.

## Deliverables:

* A link to a private Git repository (e.g., GitHub, GitLab) containing your solution.
* Ensure your README.md is comprehensive and that your `.env` file (or similar for API keys) is in `.gitignore`.

## Time Suggestion:

We anticipate this task might take approximately 4-6 hours of focused work, depending on your familiarity with the tools. Please don't spend significantly more than this, if you're approaching 6 hours, please stop and document what you would do next.

## Questions?

If anything is unclear, please don't hesitate to ask Hannes at hannes@renow.ai

Good luck! We're excited to see what you build.