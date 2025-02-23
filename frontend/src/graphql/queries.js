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
//ordenes asociadas a un usuario
export const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: Int!) {
    getOrdersByUser(user_id: $userId) {
      current_status
      order_id
      random_bag_id
      randomBag {
        description
        available
        total_price
        discount_price
        store_id
        pick_up_time
        store {
          store_name
          id_store
        }
      }
    }
  }
`;

//ordenes asociadas a una tienda
export const GET_PENDING_ORDERS = gql`
  query GetStoreOrders($storeId: Int!) {
    getOrdersByStore(store_id: $storeId) {
      order_id
      random_bag_id
      user_id
      current_status
      randomBag {
        pick_up_time
        description
        discount_price
        total_price
      }
    }
  }
`;
