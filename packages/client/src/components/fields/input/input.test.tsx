import { InputField } from "./input-field.component";
import { render, screen} from "@testing-library/react";
import { IFieldInput } from "./input-field.model";
import userEvent from '@testing-library/user-event'

const props: IFieldInput = {
    label:"Email",
    name:"email",
    value:"",
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    handleFocus: jest.fn(),
    errors:undefined,
    touched: undefined,
}
const spyHandleChange = jest.spyOn(props, "handleChange");
const spyHandleFocus = jest.spyOn(props, "handleFocus");
const spyHandleBlur = jest.spyOn(props, "handleBlur");

describe('Input field', () => {
    it('init default', () => {
        render(<InputField {...props}/>);
        const input = screen.getByLabelText("Email");
        expect(input).toBeInTheDocument();
    });

    it('change props value', () => {
        const email = 'test@mail.ru';
    
        const { rerender } = render(<InputField {...props} />);
        
        expect(screen.getByTestId<HTMLInputElement>("input")).not.toBeNull();
        rerender(
            <InputField
                {...props}
                value={email}
            />
        )
        // eslint-disable-next-line testing-library/no-node-access
        const input = screen.getByTestId<HTMLInputElement>("input").querySelector('input');
        expect(input).not.toBeNull();
        expect(input?.value).toEqual(email);
    });

    it('check error', () => {
        render(<InputField
            {...props}
            errors={"Email not found"}
            touched={true}
        />);

        const input = screen.getByLabelText("Email");
        const error = screen.getByRole("error")
        expect(input).toBeInTheDocument();
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe("Email not found");
    });

    it('check call events: change, blur, focus', () => {
        render(<InputField
            {...props}
        />);
        const inputField = screen.getByTestId("input");
        userEvent.type(inputField,"test");
        expect(spyHandleChange).toHaveBeenCalledTimes(4);
        userEvent.tab();
        expect(spyHandleFocus).toHaveBeenCalledTimes(1);
        userEvent.tab();
        expect(spyHandleBlur).toHaveBeenCalledTimes(1);
    });
})