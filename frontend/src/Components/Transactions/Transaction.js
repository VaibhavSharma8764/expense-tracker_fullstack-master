import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TransactionFilter from "./TransactionFilter";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function ViewTransactions() {
  const { incomes, expenses } = useGlobalContext();
  const [filter, setFilter] = useState({
    type: "all",
    dateRange: { startDate: "", endDate: "" },
  });

  // Combine incomes and expenses with type
  const allTransactions = useMemo(
    () => [
      ...incomes.map((item) => ({ ...item, type: "Income" })),
      ...expenses.map((item) => ({ ...item, type: "Expense" })),
    ],
    [incomes, expenses]
  );

  // Filter transactions by type and date range
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((t) => {
      const matchesType =
        filter.type === "all" || t.type.toLowerCase() === filter.type;
      const { startDate, endDate } = filter.dateRange;
      if (!startDate && !endDate) return matchesType;
      const transactionDate = new Date(t.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (
        matchesType &&
        (!start || transactionDate >= start) &&
        (!end || transactionDate <= end)
      );
    });
  }, [filter, allTransactions]);

  // Pie chart data
  const pieChartData = useMemo(() => {
    if (filter.type === "all") {
      const totalIncome = filteredTransactions
        .filter((t) => t.type === "Income")
        .reduce((sum, item) => sum + item.amount, 0);
      const totalExpense = filteredTransactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, item) => sum + item.amount, 0);
      return {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            data: [totalIncome, totalExpense],
            backgroundColor: ["#34C759", "#FF3B30"], // Green for income, red for expenses
            borderColor: ["#FFFFFF", "#FFFFFF"],
            borderWidth: 2,
          },
        ],
      };
    }

    // For 'income' or 'expense', group by category
    const isIncome = filter.type === "income";
    const transactions = filteredTransactions.filter(
      (t) => t.type === (isIncome ? "Income" : "Expense")
    );
    const categoryMap = transactions.reduce((acc, item) => {
      const category =
        item.category || item.title || (isIncome ? "Income" : "Expense");
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    // Generate shades of green for income, red for expenses
    const baseColor = isIncome ? [52, 199, 89] : [255, 59, 48]; // RGB for #34C759 or #FF3B30
    const colors = Object.keys(categoryMap).map((_, index) => {
      const factor = 1 - index * 0.1; // Lighten/darken by 10% per category
      return `rgb(${baseColor[0] * factor}, ${baseColor[1] * factor}, ${
        baseColor[2] * factor
      })`;
    });

    return {
      labels: Object.keys(categoryMap),
      datasets: [
        {
          data: Object.values(categoryMap),
          backgroundColor: colors,
          borderColor: ["#FFFFFF"],
          borderWidth: 2,
        },
      ],
    };
  }, [filter, filteredTransactions]);

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  // Handle filter changes from TransactionFilter
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <ViewTransactionsStyled>
      <InnerLayout>
        <div className="chart-wrapper">
          <h2>Transaction Breakdown</h2>
          <div className="pie-chart">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
        <h1>Recent Transactions</h1>
        <TransactionFilter
          onFilterChange={handleFilterChange}
          filteredTransactions={filteredTransactions}
          currentFilter={filter.type}
        />
      </InnerLayout>
    </ViewTransactionsStyled>
  );
}

const ViewTransactionsStyled = styled.div`
  .chart-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    margin-top: 2rem;

    h2 {
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      margin-bottom: 1rem;
      text-align: center;
    }

    .pie-chart {
      width: 100%;
      max-width: 400px;
      height: 300px;
      position: relative;
    }
  }

  @media (max-width: 768px) {
    .chart-wrapper {
      padding: 1rem;

      .pie-chart {
        max-width: 300px;
        height: 250px;
      }
    }
  }

  @media (max-width: 480px) {
    .chart-wrapper {
      padding: 0.8rem;

      h2 {
        font-size: clamp(1rem, 3vw, 1.2rem);
      }

      .pie-chart {
        max-width: 250px;
        height: 200px;
      }
    }
  }
`;

export default ViewTransactions;
