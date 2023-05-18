global class WrapperClassSortSample implements Comparable {

	public String BookTitle ;
	public String Author ;
	public Integer TotalPages ;
	public Double Price ;
	public Date publishingDate;

	public enum SORT_BY {
		ByTitle,ByPage
		}

	//Variable to decide the member on which sorting should be performed
	public static SORT_BY sortBy = SORT_BY.ByTitle;

	public WrapperClassSortSample(String bt, String a, Integer tp, Double p, Date pd)
	{
		BookTitle = bt;
		Author = a;
		TotalPages = tp;
		Price = p;
		publishingDate = pd;
	}

	global Integer compareTo(Object objToCompare) {
		//Sort by BookName Alphabetically
		if(sortBy == SORT_BY.ByTitle)
		{
			return BookTitle.compareTo(((WrapperClassSortSample)objToCompare).BookTitle);
		}
		else //Sort by Book price
		{
			return Integer.valueOf(TotalPages - ((WrapperClassSortSample)objToCompare).TotalPages);
		}
	}
}