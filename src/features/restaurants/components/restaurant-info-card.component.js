import React from "react";
import { Favorite } from "../../../components/favorites/favorite.component.js";
import {
  Icon,
  RestaurantCard,
  RestaurantCardImg,
  Info,
  Rating,
  Address,
  Section,
  SectionEnd,
} from "./restaurant-info-card-styles.js";

import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star.js";
import { Text } from "../../../components/typography/text.component.js";
import open from "..//../../../assets/open.js";
import { Spacer } from "../../../components/spacer/spacer.component.js";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Sample Name",
    // icon = " https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    icon = "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "123 Test St.",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <Favorite restaurant={restaurant} />
      <RestaurantCardImg key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && <Text variant="error"> Closed </Text>}
            <Spacer position="left" size="large" />
            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            <Spacer position="left" size="large" />
            <Icon source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
