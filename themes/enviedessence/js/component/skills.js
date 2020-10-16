import FieldSkills from '../lib/field-skills';

[...document.querySelectorAll('.field-skills')].forEach(skills => {
    new FieldSkills(skills, {
        speed: 8000,
    });
});
