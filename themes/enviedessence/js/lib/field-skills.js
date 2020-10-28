import TurningItem from './turning-item';

/**
 * Class to initialize field-skills with slider on skills.
 * Available options for field-skills are :
 *   - speed : skill rotation speed in ms (default to 2000)
 */
export default class FieldSkills {
    skills;
    turningSkills;
    options;

    /**
    * @param skills element defined as field skills
    */
    constructor(skills, options = {}) {
        this.skills = skills;

        this.initDetailWrapper();

        const defaultOptions = {
            speed: 2000,
        };

        this.options = { ...defaultOptions, ...options };

        const turningOptions = {
            speed: this.options.speed,
            callbackSelection: this.displaySkill,
        };

        this.turningSkills = new TurningItem(
            this.skills.querySelector('.skill-list'),
            turningOptions,
        );

        this.nextPrevAction();
    };

    /**
    * Display current skill (current rotation).
    * @param skill
    */
    displaySkill = (skill) => {
        const index = skill.dataset.skillIndex;

        [...this.skills.querySelectorAll('.skill-title')].forEach(skillDetail => {
            skillDetail.classList.remove('active');
        });

        this.skills.querySelector(`.skill-title[data-skill-index="${index}"]`).classList.add('active');

        [...this.skills.querySelectorAll('.skill-detail')].forEach(skillDetail => {
            skillDetail.classList.remove('active');
        });

        this.skills.querySelector(`.skill-detail[data-skill-index="${index}"]`).classList.add('active');
    };

    initDetailWrapper = () => {
        this.adaptDetailWrapper();

        window.addEventListener('resize', () => {
            this.adaptDetailWrapper();
        });
    };

    adaptDetailWrapper = () => {
        const height = this.getDetailMaxHeight();
        this.skills.querySelector('.skill-detail-wrapper').style.height = `${height}px`;
    }

    getDetailMaxHeight = () => {
        let maxHeight = 0;
        [...this.skills.querySelectorAll('.skill-detail')].forEach(skillDetail => {
            if (skillDetail.offsetHeight > maxHeight) {
                maxHeight = skillDetail.offsetHeight;
            }
        });

        return maxHeight;
    };

    nextPrevAction = () => {
        this.skills.querySelector('.skill-button-wrapper .icon-left').addEventListener('click', () => {
            this.turningSkills.turnItem(true, -1);
        });
        this.skills.querySelector('.skill-button-wrapper .icon-right').addEventListener('click', () => {
            this.turningSkills.turnItem(true, 1);
        });
    };
}
