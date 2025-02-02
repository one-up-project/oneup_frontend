import { gql } from '@apollo/client';

export const CREATE_RANDOM_BAG = gql`
  mutation CreateRandomBag($input: RandomBagInput!) {
    createRandomBag(input: $input) {
      random_bag_id
      store_id
      description
      total_price
      discount_price
      pick_up_time
      available
    }
  }
`;