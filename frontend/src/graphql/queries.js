import { gql } from "@apollo/client";

export const GET_RANDOM_BAGS = gql`
  query GetRandomBags {
    randomBags {
      random_bag_id
      store_id
      description
      total_price
      discount_price
      pick_up_time
      available
      created_at
      updated_at
      store {
        id_store
        store_name
      }
    }
  }
`;

export const GET_USER_ORDERS = gql`
query GetUserOrders {

}
  `;
