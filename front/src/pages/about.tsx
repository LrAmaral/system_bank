import { Accord } from "../components/accordion";
import { accordion } from "../utils/arrays";

function About() {
  return (
    <div>
      {accordion.map((item) => 
        <Accord key={item.id} title={item.title} text={item.text} />
      )}
    </div>
  );
}

export default About;
