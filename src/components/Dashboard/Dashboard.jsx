import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import time_img from "../../assets/Images/time-img.png";
import Time from "../../assets/Images/icons/Time.png";
import { Modal, Button } from "react-bootstrap";
import GameHistory from "../GameHistory/GameHistory";
import number0 from "../../assets/Images/icons/number-0.png";
import number1 from "../../assets/Images/icons/number-1.png";
import number2 from "../../assets/Images/icons/number-2.png";
import number3 from "../../assets/Images/icons/number-3.png";
import number4 from "../../assets/Images/icons/number-4.png";
import number5 from "../../assets/Images/icons/number-5.png";
import number6 from "../../assets/Images/icons/number-6.png";
import number7 from "../../assets/Images/icons/number-7.png";
import number8 from "../../assets/Images/icons/number-8.png";
import number9 from "../../assets/Images/icons/number-9.png";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [showModalPlay, setShowModalPlay] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedOption, setSelectedOption] = useState("x1");
  const [recentWinner, setRecentWinner] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const betAmounts = [1, 5, 10, 20, 50, 100];
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };
  const toggleModalPlay = () => {
    setShowModalPlay(!showModalPlay);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = () => {
    if (amount && amount > 0) {
      // handleFundTransferClick(amount);
      closeModal();
      setAmount("");
    } else {
      toast.error("Please enter a valid amount");
    }
  };
  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };
  const handleIncrement = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const handleDecrement = () => {
    setAmount((prevAmount) => {
      const newAmount = prevAmount - 1;
      return newAmount > 0 ? newAmount : 1;
    });
  };
  const handleAmountChange = (event) => {
    const { value } = event.target;
    // Allow only numeric values
    if (/^\d*$/.test(value) && value !== "") {
      setAmount(parseInt(value, 10));
    } else if (value === "") {
      setAmount("");
    }
  };

  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <div className="container my-5">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="wallet-box">
                <div className={`card ${styles.wallet_card}`}>
                  <div
                    className={`card-body ${styles.main_container_balance_time}`}
                  >
                    <div className={`${styles.price_box}`}>
                      <div className={`${styles.balance_show}`}>
                        <p>$ 100</p>
                        <button className={`btn ${styles.balance_box}`}>
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                      </div>
                      <div className={`${styles.balance_title}`}>
                        <i
                          className="bi bi-wallet2"
                        ></i>
                        <p> Wallet balance</p>
                      </div>
                    </div>
                    <div className={`${styles.time_box}`}>
                      {[{ text: "Win Go 1 Min" }].map((item, index) => (
                        <div
                          key={index}
                          className={`${styles.time_box_wihing} ${
                            activeIndex === index ? styles.cus_active : ""
                          }`}
                          onClick={() => handleItemClick(index)}
                        >
                          <img src={Time} alt="" />
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${styles.button_box}`}>
                    <button
                      className={`btn ${styles.withbtn}`}
                      onClick={openModal}
                    >
                      Fund Transfer
                    </button>
                    <Modal
                      show={isModalOpen}
                      onHide={closeModal}
                      className={`${styles.modal}`}
                    >
                      <Modal.Body className="p-10">
                        <div className={styles.modalContent}>
                          <h3>Enter Amount to Transfer</h3>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="form-control"
                          />
                          <div className={`${styles.btn_box}`}>
                            <Button onClick={handleSubmit} className="btn">
                              Submit
                            </Button>
                            <Button onClick={closeModal} className="btn">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <button className={`btn ${styles.depobtn}`}>
                      Deposit Fund
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className={` ${styles.play_box}`}>
                    <div className={` ${styles.how_box}`}>
                      <button
                        className={`btn ${styles.btn_howplay}`}
                        onClick={toggleModalPlay}
                      >
                        <i className="bi bi-file-earmark"></i> How to play
                      </button>
                    </div>
                    <div className={` ${styles.win_res}`}>
                      <p>
                        Win Go <strong>1Min</strong>
                      </p>
                      <div className={` ${styles.number_img}`}>
                        {recentWinner.map((item, index) => (
                          <img
                            key={index}
                            src={`/assets/number-${item.number}.png`}
                            alt={`Num`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className={` ${styles.play_box}`}>
                    <div className={` ${styles.remain_box_text}`}>
                      <p>Time remaining</p>
                    </div>
                    <div className={` ${styles.remain_time}`}>
                      <div className={` ${styles.number_count}`}>
                        <button className={`btn ${styles.count_num}`}>0</button>
                        <button className={`btn ${styles.count_num}`}>:</button>
                        <button className={`btn ${styles.count_num}`}>5</button>
                      </div>
                    </div>
                    <div className={`${styles.remain_box}`}>
                      <p className={` ${styles.bolder_num}`}>2222222222</p>
                    </div>
                  </div>
                </div>
              </div>
              <section className={`${styles.betting_card}`}>
                {show && (
                  <div className={`${styles.betting_card_mark}`}>
                    <div>0</div>
                    <div>{countDown}</div>
                  </div>
                )}
                <div className={`${styles.clr_btn_box}`}>
                  <div className={`${styles.clr_btn}`}>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("green");
                        setSelectedColor("#40ad72");
                      }}
                      className={`btn ${styles.green}`}
                    >
                      {" "}
                      Green
                    </button>
                  </div>
                  <div className={`${styles.clr_btn}`}>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("violet");
                        setSelectedColor("#b659fe");
                      }}
                      className={`btn ${styles.violet}`}
                    >
                      {" "}
                      Pink
                    </button>
                  </div>
                  <div className={`${styles.clr_btn}`}>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("red");
                        setSelectedColor("#fd565c");
                      }}
                      className={`btn ${styles.red}`}
                    >
                      {" "}
                      Blue
                    </button>
                  </div>
                </div>

                <div className={` ${styles.play_num_box}`}>
                  <div className={`${styles.numberbox_img}`}>
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("0");
                        setSelectedColor(
                          "linear-gradient(180deg, #FD565C 50.96%, #b659fe 50.97%)"
                        );
                      }}
                      src={number0}
                      alt=""
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("1");
                        setSelectedColor("#40ad72");
                      }}
                      src={number1}
                      alt="Number 1"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("2");
                        setSelectedColor("#fd565c");
                      }}
                      src={number2}
                      alt="Number 2"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("3");
                        setSelectedColor("#40ad72");
                      }}
                      src={number3}
                      alt="Number 3"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("4");
                        setSelectedColor("#fd565c");
                      }}
                      src={number4}
                      alt="Number 4"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("5");
                        setSelectedColor(
                          "linear-gradient(180deg, #40ad72 51.48%, #b659fe 51.49%)"
                        );
                      }}
                      src={number5}
                      alt="Number 5"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("6");
                        setSelectedColor("#fd565c");
                      }}
                      src={number6}
                      alt="Number 6"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("7");
                        setSelectedColor("#40ad72");
                      }}
                      src={number7}
                      alt="Number 7"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("8");
                        setSelectedColor("#fd565c");
                      }}
                      src={number8}
                      alt="Number 8"
                    />
                    <img
                      onClick={() => {
                        setShowModal(true);
                        setSelectedButton("9");
                        setSelectedColor("#40ad72");
                      }}
                      src={number9}
                      alt="Number 9"
                    />
                  </div>
                </div>

                <div className={`${styles.num_boxbtn}`}>
                  <button
                    className={`btn ${styles.num_boxbtn_random}`}
                    onClick={() => getRandomNumber()}
                  >
                    Random
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x1" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x1")}
                  >
                    x1
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x5" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x5")}
                  >
                    x5
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x10" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x10")}
                  >
                    x10
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x20" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x20")}
                  >
                    x20
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x50" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x50")}
                  >
                    x50
                  </button>
                  <button
                    className={`btn ${styles.num_boxbtn_btns} ${
                      selectedOption === "x100" ? styles.selected : ""
                    }`}
                    onClick={() => handleButtonClick("x100")}
                  >
                    x100
                  </button>
                </div>

                <div className={`${styles.num_play_boxbtn}`}>
                  <button
                    className={`btn ${styles.num_play_boxbtn_big}`}
                    onClick={() => {
                      setShowModal(true);
                      setSelectedButton("big");
                      setSelectedColor("big");
                    }}
                  >
                    Big
                  </button>
                  <button
                    className={`btn ${styles.num_play_boxbtn_small}`}
                    onClick={() => {
                      setShowModal(true);
                      setSelectedButton("small");
                      setSelectedColor("small");
                    }}
                  >
                    Small
                  </button>
                </div>
              </section>
            </div>
            <div
              className={`mx-auto ${isMobile ? "col-12" : "col-6"} ${
                styles.game_record_row
              }`}
            >
              <div className={styles.game_record}>
                <GameHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How To Play Modal */}
      <Modal
        show={showModalPlay}
        className={`${styles.how_to_play_modal}`}
        onHide={toggleModalPlay}
      >
        <Modal.Header closeButton>
          <Modal.Title className={`${styles.how_to_play_title}`}>
            How to Play
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${styles.modal_body}`}>
          <p>
            1 minutes 1 issue, 55 seconds to order, 5 seconds waiting for the
            draw. It opens all day. The total number of trade is 1440 issues. If
            you spend 100 to trade, after deductin g service fee 2%, contract
            amount: 98
          </p>
          <p>
            1.Select green: if the result shows 1,3,7,9 you will get
            (98*2)=196,If the result shows 5, you will get (98*1.5) 147
          </p>
          <p>
            2.Select red: if the result shows 2,4,6,8 you will get (98*2)=196
            :If the resuIt shows 0, you will get (98*1.5) 147
          </p>
          <p>
            3.Select violet: if the result shows 0 or 5, you will get (98*4.5)
            441
          </p>
          <p>
            4.Select number: if the result is the same as the number you
            selected, you will get (98*9)=882
          </p>
          <p>
            5.Select big: if the result shows 5,6,7,8,9 you will get (98*2)=196
          </p>
          <p>
            6.Select small: if the result shows 0,1,2,3,4 you will get
            (98*2)=196
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={`${styles.close_button}`}
            onClick={toggleModalPlay}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header
          className={`${styles.pop_up_head}`}
          style={{
            background: `${selectedColor}`,
          }}
        >
          <div className={`${styles.pop_up_title}`}>
            <p>Win Go 1Min</p>
          </div>
          <div className={`${styles.pop_up_selected}`}>
            <span>Select</span>
            <span>{selectedButton}</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={`${styles.pop_up_body}`}>
            <div className={`${styles.pop_up_body_line}`}>
              Balance
              <div className={`${styles.pop_up_body_list}`}>
                <div className={`${styles.pop_up_body_line_item}`}>1</div>
                <div className={`${styles.pop_up_body_line_item}`}>10</div>
                <div className={`${styles.pop_up_body_line_item}`}>100</div>
                <div className={`${styles.pop_up_body_line_item}`}>1000</div>
              </div>
            </div>

            <div className={`${styles.pop_up_body_line}`}>
              Quantity
              <div className={`${styles.pop_up_body_line_btn}`}>
                <button
                  className={`btn ${styles.pop_up_body_btn}`}
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className={` ${styles.pop_up_body_btn_1}`}
                />
                <button
                  className={`btn ${styles.pop_up_body_btn}`}
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className={`${styles.pop_up_body_line}`}>
              <div className="div"></div>
              <div className={`${styles.pop_up_body_line_content}`}>
                {betAmounts.map((betAmount, index) => (
                  <button
                    key={index}
                    className={`btn ${styles.pop_up_body_line_content_btn}`}
                    onClick={() => setAmount(betAmount)}
                  >
                    {`x${betAmount}`}
                  </button>
                ))}
              </div>
            </div>
            <div className={`${styles.pop_up_body_line}`}>
              <div className={`${styles.pop_up_body_line_agree}`}>
                <input
                  type="radio"
                  id="agree"
                  name="agreement"
                  className="radio-btn"
                  defaultChecked
                />
                <span>I agree Pre-sale-rules</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={`btn  ${styles.pop_up_submit}`}>
          <Button
            className={`btn ${styles.pop_up_submit_btn}`}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn"
            onClick={() => placeBet(selectedButton, amount)}
            disabled={isLoading}
          >
            {isLoading ? "Placing Bet..." : "Place Bet"}
          </Button>
        </Modal.Footer>

        {isLoading && (
          <div className={styles.loadingIndicator}>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className={styles.spinnerIcon}
            />
            <p className={styles.loadingText}>Loading...</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
