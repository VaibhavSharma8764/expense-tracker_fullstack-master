import React, { useState } from 'react';
import styled from 'styled-components';

function TransactionFilter({ onFilterChange, filteredTransactions, currentFilter }) {
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: '',
    });

    // Handle filter button clicks
    const handleFilterChange = (newFilter) => {
        onFilterChange({ type: newFilter, dateRange });
    };

    // Handle date range changes
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        const newDateRange = { ...dateRange, [name]: value };
        setDateRange(newDateRange);
        onFilterChange({ type: currentFilter, dateRange: newDateRange });
    };

    return (
        <FilterStyled>
            <h3>Filter Transactions</h3>
            <div className="filter-controls">
                <div className="filter-buttons">
                    <button
                        className={currentFilter === 'all' ? 'active' : ''}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={currentFilter === 'income' ? 'active' : ''}
                        onClick={() => handleFilterChange('income')}
                    >
                        Income
                    </button>
                    <button
                        className={currentFilter === 'expense' ? 'active' : ''}
                        onClick={() => handleFilterChange('expense')}
                    >
                        Expenses
                    </button>
                </div>
                <div className="date-range">
                    <div className="date-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={dateRange.startDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="date-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={dateRange.endDate}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
            </div>
            <div className="transaction-list">
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction, index) => (
                        <div key={index} className="transaction-item">
                            <div className="transaction-details">
                                <p className="title">{transaction.title || transaction.type}</p>
                                <p className="category">
                                    {transaction.category || transaction.title || transaction.type}
                                </p>
                                <p className="date">{transaction.date}</p>
                            </div>
                            <p className={transaction.type.toLowerCase()}>
                                ${transaction.amount.toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No transactions found.</p>
                )}
            </div>
        </FilterStyled>
    );
}

const FilterStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1.5rem;
    margin: 2rem 0;

    h3 {
        font-size: clamp(1rem, 2vw, 1.2rem);
        margin-bottom: 1rem;
    }

    .filter-controls {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .filter-buttons {
        display: flex;
        gap: 1rem;

        button {
            background: #FFFFFF;
            border: 1px solid #E0E0E0;
            border-radius: 10px;
            padding: 0.5rem 1rem;
            font-size: clamp(0.9rem, 1.5vw, 1rem);
            cursor: pointer;
            transition: all 0.3s ease;

            &.active {
                background: #34C759;
                color: #FFFFFF;
                border-color: #34C759;
            }

            &:hover {
                background: #F0F0F0;
            }
        }
    }

    .date-range {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        .date-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            label {
                font-size: clamp(0.9rem, 1.5vw, 1rem);
                font-weight: 600;
            }

            input {
                padding: 0.6rem;
                border: 1px solid #E0E0E0;
                border-radius: 10px;
                font-size: clamp(0.9rem, 1.5vw, 1rem);
                background: #FFFFFF;
                transition: border-color 0.3s ease;

                &:focus {
                    outline: none;
                    border-color: #34C759;
                }
            }
        }
    }

    .transaction-list {
        max-height: 300px;
        overflow-y: auto;
        padding-right: 0.5rem;

        .transaction-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem;
            border-bottom: 1px solid #E0E0E0;
            font-size: clamp(0.9rem, 1.5vw, 1rem);

            &:last-child {
                border-bottom: none;
            }

            .transaction-details {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;

                .title {
                    font-weight: 600;
                }

                .category {
                    font-size: clamp(0.8rem, 1.3vw, 0.9rem);
                    color: #666;
                }

                .date {
                    font-size: clamp(0.8rem, 1.3vw, 0.9rem);
                    color: #888;
                }
            }

            p.income {
                color: #34C759;
            }

            p.expense {
                color: #FF3B30;
            }
        }
    }

    @media (max-width: 768px) {
        padding: 1rem;

        .filter-buttons {
            flex-wrap: wrap;
            gap: 0.8rem;
        }

        .date-range {
            flex-direction: column;
        }

        .transaction-list {
            max-height: 250px;
        }
    }

    @media (max-width: 480px) {
        h3 {
            font-size: clamp(0.9rem, 2.5vw, 1rem);
        }

        .filter-buttons {
            button {
                padding: 0.4rem 0.8rem;
                font-size: clamp(0.8rem, 2vw, 0.9rem);
            }
        }

        .date-range {
            .date-group {
                input {
                    font-size: clamp(0.8rem, 2vw, 0.9rem);
                }
            }
        }

        .transaction-list {
            max-height: 200px;
        }
    }
`;

export default TransactionFilter;