import Head from "next/head";
import BubbleChartRoundedIcon from "@material-ui/icons/BubbleChartRounded";

const Header = ({ title }) => {
  const favicon = <BubbleChartRoundedIcon />;
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Header;
