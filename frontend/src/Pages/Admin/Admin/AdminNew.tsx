import React from "react";
import Icon from "../components/atoms/Icon";
import { FaUserCircle } from "react-icons/fa";
import { FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, TextField } from "@mui/material";
import { FiPlus } from "react-icons/fi";

import IconBtn from "../../components/btns/IconBtn";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AdminNew: React.FC = React.memo(() => {
    const [role, setRole] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    };

    const [value, setValue] = React.useState('female');

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div className='p-14 h-full w-2/4'>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                <div className="px-12 py-4 mb-8">
                    <div className="flex items-center flex-col pt-8">
                        <Icon svg={<FaUserCircle />} color='#2a3f54da' size='40px' />
                        <p className="text-lg text-gray-700 mt-1 mb-8">
                            管理者追加
                        </p>
                        <div className="w-2/3 mb-7">
                            <TextField required fullWidth label="名前" variant="outlined" size="small" />
                        </div>
                        <div className="w-2/3 mb-7">
                            <TextField required fullWidth label="ログインID" variant="outlined" size="small" />
                        </div>
                        <div className="w-2/3 mb-7">
                            <FormControl fullWidth variant="outlined" size="small">
                                <InputLabel htmlFor="outlined-adornment-password" required>パスワード</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <div className="w-2/3 mb-7">
                            <FormControl fullWidth size="small">
                                <InputLabel required>権限</InputLabel>
                                <Select
                                    value={role}
                                    label="権限"
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value=""><em>------</em></MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-2/3 mb-7">
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group" required>ステータス</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChange2}
                                >
                                    <div>
                                        <FormControlLabel value="0" control={<Radio />} label="有効" />
                                        <FormControlLabel value="1" control={<Radio />} label="無効" />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="w-2/3 mb-4">
                            <IconBtn text="登録" svg={<FiPlus />} color='primary' variant='contained' size="large" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default AdminNew