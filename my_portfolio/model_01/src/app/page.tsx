import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioExperience from "@/components/PortfolioExperience";
import { getPortfolioData } from "@/lib/portfolio-data";

const PROFILE_EMAIL = process.env.PORTFOLIO_PROFILE_EMAIL ?? "portfolio@example.com";

export default async function Home() {
  const { profile, projects, certificates, educations } = await getPortfolioData(PROFILE_EMAIL);

  return (
    <>
      <Navbar profile={profile} />
      <PortfolioExperience
        profile={profile}
        projects={projects}
        certificates={certificates}
        educations={educations}
      />
      <Footer profile={profile} />
    </>
  );
}
