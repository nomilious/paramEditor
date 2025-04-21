import ReactDOM from 'react-dom/client';
import React, { Component } from 'react';

// Apple-style design system
const colors = {
    background: '#f5f8fa',
    white: '#ffffff',
    black: '#1d1d1f',
    gray: '#86868b',
    lightGray: '#f5f5f7',
    border: '#d2d2d7',
    primary: '#0071e3',
    primaryHover: '#0077ed',
    success: '#34c759',
    error: '#ff3b30',
    shadow: 'rgba(0, 0, 0, 0.1)'
};

// Styles
const styles = {
    body: {
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        padding: '0',
        backgroundColor: colors.background,
        color: colors.black
    },
    heading: {
        color: colors.black,
        fontWeight: 500 as const,
        fontSize: '24px',
        marginBottom: '24px',
        letterSpacing: '-0.2px'
    },
    subheading: {
        color: colors.black,
        fontWeight: 500 as const,
        fontSize: '18px',
        marginBottom: '16px',
        letterSpacing: '-0.1px'
    },
    appContainer: {
        maxWidth: '800px',
        margin: '48px auto',
        padding: '0 24px'
    },
    paramEditor: {
        maxWidth: '100%',
        margin: '0',
        padding: '0',
        borderRadius: '12px',
        backgroundColor: 'transparent'
    },
    button: {
        padding: '12px 20px',
        backgroundColor: colors.primary,
        color: colors.white,
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 500 as const,
        transition: 'all 0.2s ease',
        marginTop: '0',
        boxShadow: `0 1px 2px ${colors.shadow}`
    },
    buttonHover: {
        backgroundColor: colors.primaryHover,
        transform: 'translateY(-1px)',
        boxShadow: `0 2px 4px ${colors.shadow}`
    },
    form: {
        marginBottom: '32px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: '24px',
        borderRadius: '12px',
        boxShadow: `0 2px 8px ${colors.shadow}`
    },
    formInput: {
        padding: '12px 16px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: colors.border,
        borderRadius: '8px',
        fontSize: '16px',
        flex: '1',
        backgroundColor: colors.white,
        outline: 'none',
        transition: 'all 0.2s ease'
    },
    formInputFocus: {
        borderColor: colors.primary,
        boxShadow: `0 0 0 1px ${colors.primary}`
    },
    modelContainer: {
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: colors.white,
        boxShadow: `0 2px 8px ${colors.shadow}`
    },
    modelItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: `1px solid ${colors.border}`
    },
    modelName: {
        fontWeight: 500 as const,
        fontSize: '16px',
        color: colors.black,
        padding: '0'
    },
    modelValue: {
        fontSize: '16px',
        color: colors.gray,
        padding: '6px 12px',
        backgroundColor: colors.lightGray,
        borderRadius: '6px',
        marginLeft: '12px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative' as const
    },
    editableValue: {
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative' as const,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    editHover: {
        backgroundColor: `${colors.lightGray}`,
        boxShadow: `0 0 0 1px ${colors.border}`
    },
    editIcon: {
        fontSize: '14px',
        color: colors.primary,
        marginLeft: '4px'
    },
    emptyState: {
        textAlign: 'center' as const,
        padding: '48px 0',
        color: colors.gray
    },
    section: {
        marginBottom: '24px'
    },
    parameter: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px',
        flex: 1
    },
    parameterRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    id: {
        fontSize: '12px',
        color: colors.gray,
        marginTop: '4px'
    }
};

interface Param {
    id: number;
    name: string;
    value: string;
}

interface Model {
    params: Param[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    params: Param[];
    isButtonHover: boolean;
    nextId: number;
    focusedInput: string | null;
    editingParam: number | null;
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            params: [...props.params],
            isButtonHover: false,
            nextId: props.params.length > 0 ? Math.max(...props.params.map(p => p.id)) + 1 : 1,
            focusedInput: null,
            editingParam: null
        };
    }

    onChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const nameInput = form[0] as HTMLInputElement;
        const valueInput = form[1] as HTMLInputElement;

        const id = this.state.nextId;
        const name = nameInput.value;
        const value = valueInput.value;

        if (!name.trim() || !value.trim()) return;

        const newParam = { id, name, value };

        this.setState(prevState => ({
            params: [...prevState.params, newParam],
            nextId: prevState.nextId + 1
        }));

        // Логирование добавления параметра
        console.log(`Текущие параметры:`, [...this.state.params, newParam]);

        form.reset();
        nameInput.focus();
    };

    public getModel(): Model {
        return {
            params: [...this.state.params]
        };
    }

    handleButtonMouseEnter = () => {
        this.setState({ isButtonHover: true });
    };

    handleButtonMouseLeave = () => {
        this.setState({ isButtonHover: false });
    };

    handleInputFocus = (inputName: string) => {
        this.setState({ focusedInput: inputName });
    };

    handleInputBlur = () => {
        this.setState({ focusedInput: null });
    };

    startEditing = (id: number) => {
        this.setState({ editingParam: id });
    };

    updateParamValue = (id: number, newValue: string) => {
        this.setState(prevState => ({
            params: prevState.params.map(param =>
                param.id === id ? { ...param, value: newValue } : param
            )
        }));
    };

    finishEditing = () => {
        this.setState({ editingParam: null });
        // Log updated parameters
        console.log("Updated parameters:", this.state.params);
    };

    componentDidMount() {
        document.body.style.margin = '0';
        document.body.style.fontFamily = styles.body.fontFamily;
        (document.body.style as any).WebkitFontSmoothing = 'antialiased';
        (document.body.style as any).MozOsxFontSmoothing = 'grayscale';
        document.body.style.padding = '0';
        document.body.style.backgroundColor = colors.background;
        document.body.style.color = colors.black;

        console.log('ParamEditor инициализирован');
    }

    render() {
        const { params, isButtonHover, focusedInput, editingParam } = this.state;
        const { startEditing, updateParamValue, finishEditing } = this;
        const buttonStyle = {
            ...styles.button,
            ...(isButtonHover ? styles.buttonHover : {})
        };

        const nameInputStyle = {
            ...styles.formInput,
            ...(focusedInput === 'name' ? styles.formInputFocus : {})
        };

        const valueInputStyle = {
            ...styles.formInput,
            ...(focusedInput === 'value' ? styles.formInputFocus : {})
        };

        return (
            <div style={styles.appContainer}>
                <h1 style={styles.heading}>Parameter Editor</h1>
                <div style={styles.paramEditor}>
                    <div style={styles.section}>
                        <form style={styles.form} onSubmit={this.onChange}>
                            <input
                                style={nameInputStyle}
                                type="text"
                                placeholder="Имя параметра"
                                required
                                onFocus={() => this.handleInputFocus('name')}
                                onBlur={this.handleInputBlur}
                            />
                            <input
                                style={valueInputStyle}
                                type="text"
                                placeholder="Значение параметра"
                                required
                                onFocus={() => this.handleInputFocus('value')}
                                onBlur={this.handleInputBlur}
                            />
                            <button
                                style={buttonStyle}
                                type='submit'
                                onMouseEnter={this.handleButtonMouseEnter}
                                onMouseLeave={this.handleButtonMouseLeave}
                            >
                                Добавить
                            </button>
                        </form>
                    </div>

                    {params.length > 0 ? (
                        <div style={styles.modelContainer}>
                            <h2 style={styles.subheading}>Параметры</h2>
                            {params.map(e => (
                                <div key={e.id} style={styles.modelItem}>
                                    <div style={styles.parameter}>
                                        <div style={styles.parameterRow}>
                                            <span style={styles.modelName}>
                                                {e.name}
                                            </span>
                                            {editingParam === e.id ? (
                                                <input
                                                    style={{
                                                        ...styles.formInput,
                                                        padding: '6px 12px',
                                                        width: 'auto',
                                                        minWidth: '120px',
                                                        marginLeft: '12px'
                                                    }}
                                                    type="text"
                                                    value={e.value}
                                                    onChange={(evt) => updateParamValue(e.id, evt.target.value)}
                                                    onBlur={finishEditing}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span
                                                    style={{
                                                        ...styles.modelValue,
                                                        ...styles.editableValue
                                                    }}
                                                    onClick={() => startEditing(e.id)}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = colors.lightGray;
                                                        e.currentTarget.style.boxShadow = `0 0 0 1px ${colors.primary}`;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = colors.lightGray;
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                    title="Click to edit"
                                                >
                                                    {e.value}
                                                    <span style={styles.editIcon}>✎</span>
                                                </span>
                                            )}
                                        </div>
                                        <span style={styles.id}>ID: {e.id}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.modelContainer}>
                            <div style={styles.emptyState}>
                                <p>Параметров нет. Добавьте свой первый параметр выше.</p>
                            </div>
                        </div>
                    )}
                    {params.length > 0 && (
                        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: colors.gray }}>
                            Tip: Click on parameter values to edit them
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

// Demo App to render the ParamEditor with initial data
const App = () => {
    // Empty initial params
    const initialParams: Param[] = [];

    const initialModel: Model = {
        params: initialParams
    };

    return <ParamEditor params={initialParams} model={initialModel} />;
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
