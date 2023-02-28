import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { ReactComponent as FireIcon } from "./images/fire.svg";
import { ReactComponent as StarIcon } from "./images/star.svg";
import { ReactComponent as TrophyIcon } from "./images/trophy.svg";
import { ReactComponent as ChallengeAwardIcon } from "./images/challenge-award.svg";
import { ReactComponent as ArrowIcon } from "./images/arrow.svg";
import { CardEdition } from "../CardEdition/CardEdition";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useCompleteCardMutation } from "../../redux/auth/questifyApi";
import { useTimeout } from "./helperFunctions/dateAndTime/timeout";
import { convertDayDisplay } from "./helperFunctions/dateAndTime/dayConverter";
import {
  CardItem,
  CardType,
  Category,
  DatetimeBar,
  DifficultyBar,
  FlippedCard,
  ContinueBox,
  CardContainer,
  TitleDataWrapper,
} from "./Card.styled";
import { CompletedTask } from "./completedTask/CompletedTask";

export const Card = ({
  _id,
  title,
  difficulty,
  category,
  date,
  time,
  type,
  status,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [completeCard] = useCompleteCardMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((isModalOpen) => !isModalOpen);

  const toggleIsFlipped = () => {
    if (status === "Complete") {
      return;
    }
    setIsFlipped((current) => !current);
  };

  const convertedDate = convertDayDisplay(date, type);
  const questTime = new Date(`${date}T${time}`).getTime();
  const timeout = useTimeout(questTime);

  const isChallenge = (type) => type === "challenge";
  const typeIcon = isChallenge(type) ? (
    <TrophyIcon onClick={toggleIsFlipped} />
  ) : (
    <StarIcon onClick={toggleIsFlipped} />
  );

  let awardIcon = null;
  if (isFlipped) {
    awardIcon = isChallenge(type) ? <ChallengeAwardIcon /> : <CompletedTask />;
  }

  const shortenedTitle = (() => {
    if (title.length > 18) {
      return `${title.slice(0, 17)}...`;
    } else if (undefined) {
      return console.log("ERROR");
    }
    return title;
  })();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const editOpen = () => setIsEditModalOpen(true);
  const editClose = () => setIsEditModalOpen(false);

  return (
    <CardContainer cardType={type}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <CardItem cardType={type}>
          <DifficultyBar cardType={type} difficulty={difficulty}>
            <p>{difficulty}</p>
            {typeIcon}
          </DifficultyBar>
          <TitleDataWrapper cardType={type}>
            {isChallenge(type) && <CardType>{type}</CardType>}
            <h3 onClick={editOpen}>{title}</h3>
            <DatetimeBar>
              <p>
                <span>{convertedDate}</span>, <span>{time}</span>
              </p>
              {timeout && <FireIcon />}
            </DatetimeBar>
          </TitleDataWrapper>
          <Category category={category}>{category}</Category>
        </CardItem>
        <FlippedCard>
          <p>
            COMPLETED: <span onClick={toggleIsFlipped}>{shortenedTitle}</span>
          </p>
          {awardIcon}
          <ContinueBox onClick={toggleModal}>
            <p>Continue</p>
            <ArrowIcon />
          </ContinueBox>
          <DeleteModal
            isOpen={isModalOpen}
            modalContent="Are you sure to mark card as done?"
            nameOfConfirm="Yes"
            cancelAction={toggleModal}
            confirmAction={() => completeCard(_id)}
          />
        </FlippedCard>
      </ReactCardFlip>
      {isEditModalOpen && (
        <CardEdition
          isOpen={isEditModalOpen}
          cardId={_id}
          cardType={type}
          cardChallenge={type}
          cardDifficulty={difficulty}
          cardTitle={title}
          cardTime={questTime}
          cardCategory={category}
          onCancel={editClose}
        />
      )}
    </CardContainer>
  );
};
