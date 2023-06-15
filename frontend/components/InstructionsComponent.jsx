import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
export default function InstructionsComponent() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>
          <span>Encode P2P Group 2</span>
        </h1>
        <h2>Welcome to P2P crypto swap</h2>
        
     
     <br></br><br></br><br></br><br></br>
     <h3><b><u>Team members:</u></b></h3><br></br>
      <h3><i>Mahadevaswamy K S</i></h3>
      <h3><i>Sudarshan K V</i></h3>
      <h3><i>Rahul Pujari</i></h3>
      <h3><i>Valentin P Y</i></h3>
      </header>
    </div>
    
  );
}
