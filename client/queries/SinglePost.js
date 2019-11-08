import gql from "graphql-tag";

export default gql`
{
    post(id: ID!) {
        id
        title
        body
        snaps
        date
        comments{
            id
            snaps
            content
        }
    }
}`;
