name: 🐛 Bug Report
description: Report any issues you encounter to make hugoplate even more efficient.

body:
  - type: input
    id: hugo-version
    attributes:
      label: What is your Hugo Extended Version
      description: Check the [README](https://github.com/zeon-studio/hugoplate?tab=readme-ov-file#user-content-️-prerequisites) for the required version. Use "hugo version" in your terminal to see your Hugo version.
    validations:
      required: true

  - type: input
    id: go-version
    attributes:
      label: What is your Go Version
      description: Check the [README](https://github.com/zeon-studio/hugoplate?tab=readme-ov-file#user-content-️-prerequisites) for the required version. Use "go version" in your terminal to see your Go version.
    validations:
      required: true

  - type: input
    id: node-version
    attributes:
      label: What is your Node.js Version
      description: Check the [README](https://github.com/zeon-studio/hugoplate?tab=readme-ov-file#user-content-️-prerequisites) for the required version. Use "node -v" in your terminal to see your Node.js version.
    validations:
      required: true

  - type: checkboxes
    id: make-sure
    attributes:
      label: Check for Existing Issues
      description: |
        Before reporting a problem, please confirm that you've searched thoroughly for any existing reports on the same issue. If no relevant issues are found, proceed with the report.
      options:
        - label: I have searched and found no relevant issues.
          required: true

  - type: textarea
    id: expected-behavior
    attributes:
      label: Expected Behavior
      description: A clear description of what you expected to happen.
    validations:
      required: true

  - type: textarea
    id: steps-to-reproduce
    attributes:
      label: Steps to Reproduce
      description: |
        Please explain the steps required to duplicate this issue. Include detailed commands and expected outcomes.
      placeholder: |
        1.
        2.
        3.
    validations:
      required: true

  - type: input
    id: reproduction-url
    attributes:
      label: Code Reproduction URL
      description: Please reproduce this issue and provide a link to the repository.
      placeholder: github.com/yourusername/repo

  - type: textarea
    id: additional-information
    attributes:
      label: Additional Information
      description: |
        List any other information that is relevant to your issue. You can use Markdown for formatting, including code blocks, links, etc.
