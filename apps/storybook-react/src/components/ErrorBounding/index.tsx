/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-07-03 21:23:58
 * @LastEditors: caixin
 * @LastEditTime: 2024-07-05 15:28:31
 * @Description: file content
 */
import { Component, ErrorInfo } from "react";
class ErrorBounding extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            message:error.message
        };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(error,errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <h1>{this.state.message}</h1>;
        }
        return this.props.children;
        // return this.props.children;
    }
}
export default ErrorBounding