import Link from 'next/link';
import headerStyles from "../../../styles/Header.module.css";
// import { useRouter } from "next/router";

const Article = ({ article }) => {
  //============================
  //===OPTION USING useRouter===
  //============================
  // const router = useRouter();
  // const {id} = router.query;

  return (
    <>
    <h1>{article.title}</h1>
    <p>{article.body}</p>
    <br />
    <Link className={headerStyles.description} href='/'>Go Back</Link>
    </>
  );
};

  //=================================================================
  //===OPTION USING getServerSideProps which loads at each request===
  //=================================================================
// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();
//   return {
//     props: {
//       article,
//     },
//   };
// };

//===============================================================
//=====OPTION USING getStaticProps which loads at build time=====
//===============================================================
export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const article = await res.json();
  return {
    props: {
      article,
    },
  };
};

//==================================================================
//=====getStaticProps needs getStaticPaths. Much quicker option=====
//==================================================================
export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
  const articles = await res.json();
  const ids = articles.map(article => article.id);
  const paths = ids.map(id => ({params: {id: id.toString()}}));

  return {
      paths,
      fallback: false
  }
};

export default Article;
