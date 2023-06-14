import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link"; // Import Link from Next.js
import styles from "../../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
        <img className={styles.alchemy_logo} src="/cw3d-logo.png"></img>
      </a>

      <div className={styles.nav_links}>
        <Link href="/" passHref>
          <span className={styles.nav_link}>Home</span>
        </Link>
        <Link href="/dashboard" passHref>
          <span className={styles.nav_link}>Dashboard</span>
        </Link>
        <Link href="/listings" passHref>
          <span className={styles.nav_link}>Listings</span>
        </Link>
      </div>

      <ConnectButton></ConnectButton>
    </nav>
  );
}
