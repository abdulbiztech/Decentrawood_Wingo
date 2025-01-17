import React, { useEffect, useContext, useState } from "react";
import styles from "./gamehistory.module.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_BASE_URL from "../../environment/api";
import myContext from "../Context/MyContext";
import io from "socket.io-client";
import { Modal, Button } from "react-bootstrap";
import winResult from "../../assets/Images/icons/win-result.png";
import loseResult from "../../assets/Images/icons/lose-result.png";

const GameHistory = (props) => {
  const { setIsplace, isplace, setShowResult, showResult } = props;
  const {
    issueNum,
    setIssueNum,
    balance,
    setBalance,
    countDown,
    setCountDown,
    userBet,
    setUserBet,
  } = useContext(myContext);
  const [selectedButton, setSelectedButton] = useState("gameHistory");
  const [gameHistory, setGameHistory] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userResults, setUserResults] = useState("");
  const [betPlaced, setBetPlaced] = useState(false);
  const { userId, setUserId } = useContext(myContext);
  const pageSize = 13;
  const [currentPageMyhistory, setCurrentPageMyHistory] = useState(1);
  const [totalPagesMyhistory, setTotalPagesMyhistory] = useState(1);
  const [paginatedDataMyHis, setPaginatedDataMyHis] = useState([]);
  const itemsPerPage = 10;
  const [resultAnnounced, setResultAnnounced] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCardClick = (cardId) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  const getColorForPremium = (number) => {
    const numString = String(number).toLowerCase();
    if (numString === "0") {
      return styles.gradientRedViolet2;
    } else if (numString === "5") {
      return styles.gradientGreenViolet2;
    } else if (["2", "4", "6", "8"].includes(numString)) {
      return styles.redColor2;
    } else if (["1", "3", "7", "9"].includes(numString)) {
      return styles.greenColor2;
    } else {
      return "";
    }
  };

  const getColorForSelectType = (selectType) => {
    if (selectType.toLowerCase() === "0") {
      return styles.gradientRedViolet;
    } else if (selectType.toLowerCase() === "5") {
      return styles.gradientGreenViolet;
    } else if (["2", "4", "6", "8"].includes(selectType.toLowerCase())) {
      return styles.redColor;
    } else if (["1", "3", "7", "9"].includes(selectType.toLowerCase())) {
      return styles.greenColor;
    } else if (selectType.toLowerCase() === "small") {
      return styles.smallColor;
    } else if (selectType.toLowerCase() === "big") {
      return styles.bigColor;
    } else if (selectType.toLowerCase() === "green") {
      return styles.greenColor;
    } else if (selectType.toLowerCase() === "violet") {
      return styles.violetColor;
    } else if (selectType.toLowerCase() === "red") {
      return styles.redColor;
    } else {
      return "";
    }
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton((prevButton) =>
      prevButton === buttonName ? prevButton : buttonName
    );
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageMyHistory = (page) => {
    if (page >= 1 && page <= totalPagesMyhistory) {
      setCurrentPageMyHistory(page);
    }
  };
  const dummyGameHistory = [
    {
      issueNumber: "1",
      number: "15",
      category: "Big",
      color: "red",
    },
    {
      issueNumber: "2",
      number: "23",
      category: "Small",
      color: "red,violet",
    },
    {
      issueNumber: "3",
      number: "5",
      category: "Big",
      color: "violet",
    },
    {
      issueNumber: "1",
      number: "15",
      category: "Big",
      color: "red",
    },
    {
      issueNumber: "2",
      number: "23",
      category: "Small",
      color: "red,violet",
    },
    
  ];
  
  const dummyUserBet = [
    {
      orderId: "A123",
      issueNumber: "1",
      selectType: "Big",
      number: "15",
      color: "red,violet",
      category: "Big",
      betResult: "win",
      createdAt: "2024-09-01",
      betAmount: 50,
      betCount: 1,
      amountAfterTax: 45,
      profitAmount: 40,
      serviceFee: 5,
    },
    {
      orderId: "B456",
      issueNumber: "2",
      selectType: "Small",
      number: "23",
      color: "green,violet",
      category: "Small",
      betResult: "failed",
      createdAt: "2024-09-02",
      betAmount: 30,
      betCount: 2,
      amountAfterTax: 20,
      profitAmount: -10,
      serviceFee: 10,
    },
    // Add more items as needed
  ];
  
  const getGameHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/game/get-game-history?page=${currentPage}`
      );
      // setGameHistory(response?.data?.data);
      setGameHistory(dummyGameHistory);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching game history:", error);
    }
  };
  const getUserBetHistory = () => {
    // Simulate an API call with dummy data
    setLoading(true);
    setUserBet(dummyUserBet);
    setTotalPagesMyhistory(1); // Update with actual total pages if needed
    setLoading(false);
  };
  useEffect(() => {
    if (selectedButton === "gameHistory") {
      getGameHistory();
    } else if (selectedButton === "myHistory") {
      getUserBetHistory();
    }
  }, [selectedButton, currentPage, currentPageMyhistory]);
  // const getUserBetHistory = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.get(
  //       `${API_BASE_URL}/api/user/bet-history?userId=${userId}&page=${currentPageMyhistory}`
  //     );
  //     const betData = response?.data?.data;
  //     setUserBet(betData);
  //     setTotalPagesMyhistory(response?.data?.pagination?.totalPages);
  //     sessionStorage.setItem("userBet", JSON.stringify(betData));
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching user bet history:", error);
  //     setLoading(false);
  //   }
  // };

  const getBalance = async () => {
    const storedUserId = sessionStorage.getItem("userId");
    if (!storedUserId) {
      console.log("Stored User ID is null");
      return;
    }
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/user/get-balance?userId=${storedUserId}`
      );
      if (!response.data) {
        throw new Error("Failed to fetch user balance data");
      }
      const userBalance = response.data.data?.userBalance;
      if (userBalance === null || userBalance === undefined) {
        console.log("User balance is empty or null");
        setBalance(0);
      } else {
        setBalance(userBalance);
      }
    } catch (error) {
      console.error("Error fetching user balance data:", error);
    }
  };
  const getUserResult = async () => {
    if (!issueNum) {
      console.error("Error: No issue number available.");
      return;
    }
    const data = {
      userId: userId,
      issueNumber: issueNum,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/game/announce-results`,
        data
      );
      if (response.status === 200) {
        setResultAnnounced(true);
        setGameResult(response.data);
        setUserResults(response.data);
        await getBalance();
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          `${error.response.status} ${error.response.statusText}: ${error.response.data}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error fetching user result:", error.message);
      }
    }
  };

  const placeBetsData = (placeBets) => {
    if (placeBets) {
      setBetPlaced(true);
    }
  };

  const handlePopUpResult = () => {
    setResultAnnounced(false);
  };

  const handleAutoClose = () => {
    setTimeout(() => {
      setResultAnnounced(false);
    }, 3000);
  };
  useEffect(() => {
    if (resultAnnounced) {
      handleAutoClose();
    }
  }, [resultAnnounced]);
  useEffect(() => {
    if (userId) {
      getUserBetHistory(userId, currentPageMyhistory, setUserBet, setLoading);
    }
  }, [userId, currentPageMyhistory]);

  useEffect(() => {
    if (countDown === 0 && userBet.length > 0 && betPlaced) {
      getUserResult();
    }
  }, [countDown, userBet, betPlaced]);

  useEffect(() => {
    if (countDown === 0 && isplace) {
      setIsplace(false);
    }
  }, [countDown, isplace]);

  useEffect(() => {
    if (isplace) {
      getUserBetHistory();
      setIsplace(false);
    }
  }, [isplace]);

  // useEffect(() => {
  //   const storedUserId = sessionStorage.getItem("userId");
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //     const storedBetData = sessionStorage.getItem("userBet");
  //     if (storedBetData) {
  //       setUserBet(JSON.parse(storedBetData));
  //     } else {
  //       getUserBetHistory();
  //     }
  //   } else {
  //     console.error("User ID not found.");
  //   }
  // }, []);

  useEffect(() => {
    if (userId) {
      getUserBetHistory();
    }
  }, [userId]);

  // useEffect(() => {
  //   const socket = io(`${API_BASE_URL}`);
  //   const countDownIssue = (countdownUpdate) => {
  //     setIssueNum(countdownUpdate?.issueNumber);
  //     setCountDown(countdownUpdate?.remainingTime);
  //     if (countdownUpdate?.remainingTime === 0) {
  //       getGameHistory();
  //       getUserBetHistory();
  //     }
  //   };
  //   socket.on("countdownUpdate", countDownIssue);
  //   socket.on("placeBets", placeBetsData);

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [currentPageMyhistory, currentPage, setIssueNum, setCountDown]);

  useEffect(() => {
    if (countDown === 0 && userBet.length > 0) {
      getGameHistory();
      getUserBetHistory();
      setBetPlaced(false);
      setShowResult(true);
    }
  }, [countDown, betPlaced, userBet]);

  useEffect(() => {
    setPaginatedData(
      gameHistory.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [gameHistory, currentPage, pageSize]);

  useEffect(() => {
    setPaginatedDataMyHis(
      userBet?.slice(
        (currentPageMyhistory - 1) * itemsPerPage,
        currentPageMyhistory * itemsPerPage
      )
    );
  }, [userBet, currentPageMyhistory, itemsPerPage]);

  // useEffect(() => {
  //   const storedUserId = sessionStorage.getItem("userId");
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //     getUserBetHistory();
  //   } else {
  //     console.error("User ID not found.");
  //   }
  // }, []);

  // useEffect(() => {
  //   const storedUserId = sessionStorage.getItem("userId");
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //     getUserBetHistory();
  //   } else {
  //     console.error("User ID not found.");
  //   }
  // }, []);

  // useEffect(() => {
  //   getGameHistory();
  //   const socket = io(`${API_BASE_URL}`);
  //   const countDownIssue = (countdownUpdate) => {
  //     setIssueNum(countdownUpdate?.issueNumber);
  //     setCountDown(countdownUpdate?.remainingTime);
  //     if (countdownUpdate?.remainingTime === 0) {
  //       getGameHistory();
  //       getUserBetHistory();
  //     }
  //   };
  //   socket.on("countdownUpdate", countDownIssue);
  //   socket.on("placeBets", placeBetsData);

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [currentPageMyhistory, currentPage, setIssueNum, setCountDown]);

  // useEffect(() => {
  //   if (userBet) {
  //     sessionStorage.setItem("userBet", JSON.stringify(userBet));
  //   }
  // }, [userBet]);

  // useEffect(() => {
  //   if (countDown === 0 && userBet.length > 0) {
  //     getGameHistory();
  //     getUserBetHistory();
  //     setBetPlaced(false);
  //     setShowResult(true);
  //   }
  // }, [countDown, betPlaced, userBet]);

  useEffect(() => {
    setPaginatedData(
      gameHistory.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [gameHistory, currentPage, pageSize]);

  useEffect(() => {
    setPaginatedDataMyHis(
      userBet?.slice(
        (currentPageMyhistory - 1) * itemsPerPage,
        currentPageMyhistory * itemsPerPage
      )
    );
  }, [userBet, currentPageMyhistory, itemsPerPage]);
  return (
    <>
      <Modal
        className={`${styles.model_body}`}
        show={resultAnnounced}
        onHide={() => setResultAnnounced(false)}
      >
        <Modal.Body className="p-0">
          <div className={styles.modal}>
            {gameHistory && (
              <div className={styles.lotteryResult}>
                <h5>Lottery Result</h5>
                <button className={`btn ${styles.lottery_color_result}`}>
                  {gameHistory[0]?.color}
                </button>
                <button className={`btn ${styles.lottery_color_number}`}>
                  {gameHistory[0]?.number}
                </button>
                <button className={`btn ${styles.lottery_color_category}`}>
                  {gameHistory[0]?.category}
                </button>
              </div>
            )}

            <div className={styles.modalTop}>
              <img
                src={gameResult && gameResult.status ? winResult : loseResult}
                alt="Result"
                className={styles.modalIcon + " u-imgResponsive"}
              />
              <div className={styles.modalHeader}>
                {gameResult && gameResult.status ? (
                  <p>Congratulations!</p>
                ) : (
                  <p>Sorry, you lost</p>
                )}
              </div>
              <div className={styles.modalSubheader}>
                {gameResult && gameResult.status ? (
                  <p>{gameResult?.message}</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <div className={styles.modalBottom}>
              <label htmlFor="autoClose">
                Automatically closing in 3 seconds
              </label>
            </div>

            <div className={`${styles.closeBtn}`}>
              <button
                type="button"
                className="btn btn-close shadow-none"
                onClick={handlePopUpResult}
              ></button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className={styles.gameHistory}>
        <button
          className={`btn ${
            selectedButton === "gameHistory"
              ? styles.gamehistory_btn_selected
              : styles.gamehistory_btn
          }`}
          onClick={() => handleButtonClick("gameHistory")}
        >
          Game History
        </button>
        <button
          className={`btn ${
            selectedButton === "myHistory"
              ? styles.myhistory_btn_selected
              : styles.myhistory_btn
          }`}
          onClick={() => handleButtonClick("myHistory")}
        >
          My History
        </button>
      </div>
      {selectedButton === "gameHistory" && (
        <>
          {gameHistory.length === 0 ? (
            <div className={`${styles.noData_message}`}>
              No game history available.
            </div>
          ) : (
            <div className="table-responsive">
              <table className={`${styles.table}`}>
                <thead>
                  <tr>
                    <th className={`${styles.table_head}`}>Period</th>
                    <th className={`${styles.table_head}`}>Number</th>
                    <th className={`${styles.table_head}`}>Big Small</th>
                    <th className={`${styles.table_head}`}>Colour</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((item, index) => (
                    <tr key={index}>
                      <td>{item.issueNumber}</td>

                      <td className={`${getColorForPremium(item.number)}`}>
                        {item.number}
                      </td>

                      <td>{item.category}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {item.color &&
                          typeof item.color === "string" &&
                          item.color.includes("red") &&
                          item.color.includes("violet") ? (
                            <>
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  backgroundColor: "#fd565c",
                                }}
                              ></div>
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  backgroundColor: "#ec4cdf",
                                }}
                              ></div>
                            </>
                          ) : item.color &&
                            typeof item.color === "string" &&
                            item.color.includes("green") &&
                            item.color.includes("violet") ? (
                            <>
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  backgroundColor: "#47ba7c",
                                }}
                              ></div>
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  backgroundColor: "#ec4cdf",
                                }}
                              ></div>
                            </>
                          ) : item.color &&
                            typeof item.color === "string" &&
                            item.color.includes("violet") &&
                            item.number !== "5" ? (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#ec4cdf",
                              }}
                            ></div>
                          ) : item.color &&
                            typeof item.color === "string" &&
                            item.color.includes("red") &&
                            item.number !== "5" ? (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#fd565c",
                              }}
                            ></div>
                          ) : item.color === "green" ? (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#47ba7c",
                              }}
                            ></div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedButton === "myHistory" && (
        <div className="row dashboard-cards">
          {userBet.length === 0 ? (
            <div className={`${styles.noData_message}`}>
              No betting history available.
            </div>
          ) : (
            userBet?.map((bet, index) => (
              <div
                key={index}
                className={`card col-md-12 ${styles.mygame_history_item_2}`}
                onClick={() => handleCardClick(index)}
              >
                <div className={`${styles.MyGameRecordList__C}`}>
                  <div
                    className={`${
                      styles.MyGameRecordList__item_1
                    } ${getColorForSelectType(
                      bet.selectType,
                      bet.number,
                      bet.color
                    )}`}
                  >
                    {bet.selectType}
                  </div>

                  <div className="MyGameRecordList__C-item-m">
                    <div className="MyGameRecordList__C-item-m-top">
                      {bet.issueNumber}
                    </div>
                    <div className="MyGameRecordList__C-item-m-bottom">
                      {bet.betResult !== "pending" && (
                        <div className="MyGameRecordList__C-item-m-bottom">
                          {bet.createdAt}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`${styles.MyGameRecordList__C_item_r}`}>
                    <div
                      className={`${styles.bet_result_box} ${
                        bet.betResult === "win"
                          ? styles.greenSuccess
                          : styles.redfail
                      }`}
                    >
                      {bet.betResult !== "pending" &&
                        (bet.betResult === "win" ? "Success" : "Failed")}
                    </div>
                    <span
                      className={
                        bet.betResult === "win" ? styles.green : styles.red
                      }
                    >
                      {bet.betResult !== "pending"
                        ? `${bet.betResult === "win" ? "+" : "-"}$${
                            bet.betResult === "win"
                              ? bet.profitAmount
                              : bet.amountAfterTax
                          }`
                        : "Pending"}
                    </span>
                  </div>
                </div>

                {selectedCard === index && (
                  <div>
                    <div className={`${styles.card_Details}`}>
                      <h2>Details</h2>
                      <div className={`${styles.card_Details_1}`}>
                        <p>Order Number</p>
                        <p>{bet.orderId}</p>
                      </div>
                      <div className={`${styles.card_Details_2}`}>
                        <p>Period</p>
                        <p>{bet.issueNumber}</p>
                      </div>

                      <div className={`${styles.card_Details_3}`}>
                        <p>Purchase Amount</p>
                        <p>{`$${bet.betAmount}`}</p>
                      </div>

                      <div className={`${styles.card_Details_4}`}>
                        <p>Quantity</p>
                        <p>{bet.betCount}</p>
                      </div>

                      <div className={`${styles.card_Details_5}`}>
                        <p>Amount After Tax</p>
                        <p
                          className={bet.betResult === "win" ? "green" : "red"}
                        >{`$${bet.amountAfterTax}`}</p>
                      </div>

                      <div className={`${styles.card_Details_6}`}>
                        <p>Tax</p>
                        <p>{`$${bet.serviceFee}`}</p>
                      </div>
                      <div className={`${styles.card_Details_7}`}>
                        <p>Result</p>
                        <div>
                          <div className={styles.MyGameRecordList__C_inlineB}>
                            {bet.betResult === "pending"
                              ? "Pending"
                              : `${bet.number}`}
                          </div>
                          <div className={styles.MyGameRecordList__C_inlineB}>
                            {bet.betResult === "pending"
                              ? "Pending"
                              : `${bet.color}`}
                          </div>
                          <div className={styles.MyGameRecordList__C_inlineB}>
                            {bet.betResult === "pending"
                              ? "Pending"
                              : `${bet.category}`}
                          </div>
                        </div>
                      </div>

                      <div className={`${styles.card_Details_8}`}>
                        <p>Select</p>
                        <p>{bet.selectType}</p>
                      </div>

                      <div className={`${styles.card_Details_9}`}>
                        <p>Status</p>
                        <p
                          className={bet.betResult === "win" ? "green" : "red"}
                        >
                          {" "}
                          {bet.betResult === "pending"
                            ? "Pending"
                            : `${
                                bet.betResult === "win" ? "Success" : "Failed"
                              }`}
                        </p>
                      </div>
                      <div className={`${styles.card_Details_10}`}>
                        <p>Win/Lose</p>
                        <p
                          className={bet.betResult === "win" ? "green" : "red"}
                        >
                          {bet.betResult === "pending"
                            ? "Pending"
                            : `$${bet.profitAmount}`}
                        </p>
                      </div>

                      <div className={`${styles.card_Details_11}`}>
                        <p>Order Time</p>
                        <p>{bet.createdAt}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageMyHistory(currentPageMyhistory - 1)}
              disabled={currentPageMyhistory === 1}
            >
              Previous
            </button>
            <span>
              {currentPageMyhistory} / {totalPagesMyhistory}
            </span>
            <button
              onClick={() => handlePageMyHistory(currentPageMyhistory + 1)}
              disabled={currentPageMyhistory === totalPagesMyhistory}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameHistory;
