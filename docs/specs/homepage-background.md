Spec: 

The goal of the spec is to build an efficient performant cursor/pointer based anumation.

When cursor mouse enter to a component it will trigger a visual feedback

Requirement: 

Distribution and usage
- Future deployment as as an npm package. So it has be in different place of the directory.

Vanila JS library
- Controller - It will hold the main logic and a default feedback in case no custom feedack is applied.
  - Performance Constaint: Register the mouse enter and exit listener but use on request animation frame to apply the feeback logic.
- Feedback   
  - Feeback logic which as ablity to take different feedback code.

React Component Wrapper
  - Takes Vanila JS library to apply the cursor logic


Code Style guideline:
- Modular
- Performant 
- Cross browser Compatiblity
- Unit testing