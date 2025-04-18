import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...incomes.map((item) => item.amount))}</p>
              <p>${Math.max(...incomes.map((item) => item.amount))}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...expenses.map((item) => item.amount))}</p>
              <p>${Math.max(...expenses.map((item) => item.amount))}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem;
    justify-content: space-between;

    .chart-con {
      flex: 1 1 60%;
      min-width: 300px;
      max-height: 400px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .amount-con {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        margin-top: 1.5rem;
        justify-content: space-between;

        .income,
        .expense,
        .balance {
          flex: 1 1 30%;
          min-width: 200px;
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          margin-bottom: 1rem;

          h2 {
            font-size: clamp(1rem, 2vw, 1.2rem);
            margin-bottom: 0.5rem;
          }

          p {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: 700;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .balance {
          p {
            color: var(--color-green);
            opacity: 0.6;
          }
        }
      }
    }

    .history-con {
      flex: 1 1 35%;
      min-width: 250px;
      margin-top: 6rem; /* Increased margin by 1rem (approx. 16px) to move history-con further down */

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: clamp(1rem, 2vw, 1.2rem);
      }

      .salary-title {
        span {
          font-size: clamp(1.2rem, 2.5vw, 1.5rem);
        }
      }

      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 0.8rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        p {
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.3rem);
          word-break: break-all;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .stats-con {
      flex-direction: column;
      align-items: stretch;

      .chart-con,
      .history-con {
        flex: 1 1 100%;
      }

      .amount-con {
        .income,
        .expense,
        .balance {
          flex: 1 1 45%;
          min-width: 150px;
        }
      }

      .history-con {
        margin-top: 3rem; /* Adjusted for smaller screens */
      }
    }
  }

  @media (max-width: 768px) {
    .stats-con {
      .amount-con {
        .income,
        .expense,
        .balance {
          flex: 1 1 100%;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .stats-con {
      padding: 0.5rem;

      .amount-con {
        gap: 1rem;

        .income,
        .expense,
        .balance {
          padding: 0.8rem;

          p {
            font-size: clamp(1.2rem, 4vw, 1.5rem);
          }
        }
      }

      .history-con {
        .salary-item {
          flex-direction: column;
          gap: 0.5rem;
        }
      }
    }
  }
`;

export default Dashboard;
