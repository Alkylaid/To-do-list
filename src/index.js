import './style.css';
import {initButtons} from './ui.js';
import {load, setCurrentProject} from './content.js';
import {createProject} from './projects.js';

initButtons();
setCurrentProject(0);
load();