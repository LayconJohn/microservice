export default interface CourseRepository {
    get(courseId: string): Promise<Course>;
    
}