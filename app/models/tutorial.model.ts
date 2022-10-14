export default (sequelize: any, Sequelize: any) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    })

    return Tutorial
}