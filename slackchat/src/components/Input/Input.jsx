export default function Input() {
    return (
        <input 
            id='username'
            name='username'
            placeholder='Ваш ник'
            onChange={formik.handleChange}
            value={formik.values.username}
        />
    )
}