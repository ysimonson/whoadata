import csv, sys, os

def mil(value):
    return int(value) * 1000000
    
def normalize(value, multiplier, type):
    if type == 'int':
        return int(value) * multiplier, True
    elif type == 'float':
        return float(value) * multiplier, True
    elif type == 'str':
        return value, False

def main():
    if len(sys.argv) < 5:
        print 'USAGE: python csv_to_json.py <csv file> <var name> <multiplier> <type 0> <type 1> ... <type n>'
        sys.exit(0)
        
    file_path = os.path.join(os.path.dirname(__file__), sys.argv[1])
    var_name = sys.argv[2]
    multiplier = int(sys.argv[3])
    types = sys.argv[4:]
    
    reader = csv.reader(open(file_path))
    first_row = True
    
    print '%s = [' % var_name
    
    for row in reader:
        if first_row:
            first_row = False
            continue
        
        first_index = True
        row_entry = '    ['
        
        for i in xrange(len(row)):
            normalized, is_num = normalize(row[i], multiplier, types[i])
            
            if first_index:
                first_index = False
            else:
                row_entry += ', '
                
            if is_num:
                row_entry += "%s" % normalized
            else:
                row_entry += "'%s'" % normalized
                
        row_entry += '],'
        print row_entry
        
    print '];'
    
if __name__ == '__main__':
    main()