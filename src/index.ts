// Models
export * from "./models/sonar";

import "./tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

library.add(
    faHouse
);

// Components
import EtButton from "./components/etButton/EtButton.vue";
export { EtButton };
