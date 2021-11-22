import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;

      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;

      border: 0;

      background: var(--shape);
      font-weight: 400;

      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }

    @media (max-width: 900px) {
      width: 90%;
      display: grid;
      grid-template-columns: 150px 1fr;

      place-items: center;

      overflow-x: auto;

      thead tr,
      tbody tr {
        display: flex;
        flex-direction: column;
      }

      tbody {
        display: flex;
      }
      tbody td {
        min-width: max-content;
      }
    }
  }
`;
