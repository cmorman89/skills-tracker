# SKILL TRACKER

## Overview:

Tracking the skills you learn can be a deceptively difficult task, especially for continuing education. This project is a web app that allows you to track the skills you learn in a hierarchical, many-to-many fashion. This creates a flexible, yet powerful, skill tree that can be especially helpful to match to a job description.  

---

## Description:

This project is a web app for tracking your skills you learn. It allows you to create a skill tree with many-to-many relationships. This means that you can have multiple parent skills for a single child skill, and vice versa. This is useful for tracking skills that are related to each other in different ways.

Each skill has a name, description, mastery level -- and soon some examples. While name and description are self-explanatory, the mastery level is a number between 1 and 5 that represents how well you know the skill. A 1 represents master equivalent to a "beginner" and 5 being equivalent to an "expert".

Skill-based examples will allow the linking of a skill with a specific project, task, or accomplishment that demonstrates the mastery or application of the skill.

The project uses React for the frontend and Flask plus SQLAlchemy for the backend. The backend is a RESTful API that allows the frontend to interact with the database. The frontend is a single-page application that uses React Router for navigation.

---

## Video Demo:

---

## Installation/Setup:

---

## Files:
### Python Files:

### React Components:

#### Base Components:
> Layout-related components that structure the web app.
>
> | Folder | Component | Description |
> | --- | --- | --- |
> | `base_components` | `MainContent` | The main content of the app. Contains the React `Routes`. |
> | `base_components` | `Sidebar` | The sidebar of the app. |

#### Form Components > Button Components:

> Clickable button-like components that can serve as nodes in lists or other UI elements.
>
> | Folder | Component | Description |
> | --- | --- | --- |
> | `form_components/buttons` | `TextWithIcon` | A button component with text > and a custom icon on the left. |
> | `form_components/buttons` | `TextWithNA` | A button component for disabled > states. |
> | `form_components/buttons` | `TextWithPlus` | A button component for success > or addable states. |
> | `form_components/buttons` | `TextWithX` | A button component for error or removable states. |

#### Form Components > Input Components:

> Basic form input components that are styled and ready to use.
> | Folder | Component | Description |
> | --- | --- | --- |
> | `form_components/inputs` | `RangeInput` | A styled range input component. |
> | `form_components/inputs` | `TextAreaInput` | A styled text area input > component. |
> | `form_components/inputs` | `TextInput` | A style text input component. |

#### Form Components > Skill Form Components:

> Specialized form components with specific functionality and contextual information.
>
> | Folder | Component | Description |
> | --- | --- | --- |
> | `form_components/skill_form` | `SkillDescriptionInput` | The `textarea` > form component for the skill description |
> | `form_components/skill_form` | `SkillMasteryInput` | The skill mastery > slider form component. |
> | `form_components/skill_form` | `SkillNameInput` | The skill name text field > input form component. |
> | `form_components/skill_form` | `SkillParentList` | Subcomponent that > displays a single list of parent skills. |
> | `form_components/skill_form` | `SkillParentManager` | Actual/available parent selection form component. |

#### Form Components > Style Components:

> Style components that are used to enhance the visual appearance of the app.
>
> | Folder | Component | Description |
> | --- | --- | --- |
> | `form_components/style` | `Divider` | A horizontal divider component. |

