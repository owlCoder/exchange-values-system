interface ITopUpPopup {
    card_number: string;
    uid: number | undefined;
    closeModalMethod: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

export default ITopUpPopup;