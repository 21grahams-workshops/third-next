import { server } from "../../../config";
import Link from "next/link";
import Meta from "../../../components/Meta";
import layoutStyles from "../../../styles/Layout.module.css";
// import { useRouter } from "next/router";

const Article = ({ article }) => {
  //============================
  //===OPTION USING useRouter===
  //============================
  // const router = useRouter();
  // const {id} = router.query;

  return (
    <>
      <Meta title={article.title} />
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">
        <a className={layoutStyles.main}>Go Back</a>
      </Link>
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

// //===============================================================
// //=====OPTION USING getStaticProps which loads at build time=====
// //===============================================================
// export const getStaticProps = async (context) => {
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

// //==================================================================
// //=====getStaticProps needs getStaticPaths. Much quicker option=====
// //==================================================================
// export const getStaticPaths = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   const articles = await res.json();
//   const ids = articles.map((article) => article.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

//======================================================================
//=====getStaticProps for API call using data, NOT json placeholder=====
//======================================================================
export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();
  return {
    props: {
      article,
    },
  };
};

//======================================================================
//=====getStaticPaths for API call using data, NOT json placeholder=====
//======================================================================
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();
  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;
