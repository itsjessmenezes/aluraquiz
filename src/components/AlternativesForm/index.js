import styled from 'styled-components';

const AlternativesForm = styled.form`
  label {
    &[data-selected="true"] {
      background-color: ${({ theme }) => theme.colors.primary};
      
      &[data-status="SUCCESS"] {
        background-color: ${({ theme }) => theme.colors.success};
        transform: scale(1.1);

      }
      &[data-status="ERROR"] {
        background-color: ${({ theme }) => theme.colors.wrong};
        animation: shake 500ms infinite linear
      }
      @keyframes shake {
        0% {
          transform: translate(5px);
        }
        10% {
          transform: translate(-5px);
        }
      }
    }
    &:focus {
      opacity: 1;
    } 
  }
  button {
    margin-top: 24px;
  }
`;

export default AlternativesForm;