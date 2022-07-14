import './style.css';
import {initButtons} from './ui.js';
import {load, setCurrentProject} from './content.js';

initButtons();
setCurrentProject(0);
load();