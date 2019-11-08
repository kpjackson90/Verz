import gql from "graphql-tag";

export default gql`
  {
    posts {
      id
      title
      body
      snaps
      date
      comments {
        id
        snaps
        content
      }
    }
  }
`;
