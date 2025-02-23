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

// export const GET_PENDING_ORDERS = gql`
//   query GetPendingOrders($userId: Int!) {
//     getOrdersByUser(user_id: $userId) {
//       current_status
//       order_id
//       random_bag_id
//       randomBag {
//         description
//         available
//         total_price
//         discount_price
//         store_id
//         pick_up_time
//         store {
//           store_name
//           id_store
//         }
//       }
//     }
//   }
// `;
