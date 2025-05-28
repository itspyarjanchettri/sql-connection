
export interface category{
  id:number;
  name:string;
}

export const categories: category[] = [];

export function getAllCategory(): category[]{
  return categories;
}

export function getAllCategoryById(id:number){
  return categories.find((c)=> c.id === id);
}

// export function createCategory()


